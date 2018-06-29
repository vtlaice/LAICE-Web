package edu.vt.ece.laice.web.backend.packet

import edu.vt.ece.laice.web.backend.model.Packet
import java.time.Instant
import java.time.temporal.ChronoUnit
import java.util.*

object PacketGenerator {
    fun createLiibDataAt(time: Long, schedulePacket: SchedulePacket, opMode: OpMode): CommandHolder<CommandLIIB> {
        return CommandHolder(CommandLIIB(
                liibMode = schedulePacket.liibMode,
                opMode = opMode
        ))
    }

    fun createRpaDataAt(time: Long, schedulePacket: SchedulePacket, opMode: OpMode): CommandHolder<CommandRPA> {
        if (!schedulePacket.rpa) return CommandHolder(CommandRPA.NULL)
        return CommandHolder(CommandRPA(
                pointsPerSweep = PointPerSweepRPA.PPS_64,
                rg2Mode = schedulePacket.rg2ModeRpa ?: RG2ModeRPA.NULL,
                sweepMode = schedulePacket.sweepModeRpa ?: SweepModeRPA.NULL,
                stepSize = if (schedulePacket.sweepModeRpa == SweepModeRPA.CONSTANT_VOLTAGE) StepSizeRPA.ION_TRAP else StepSizeRPA.STEP_SIZE_PPS_64
        ))
    }

    fun createSneupiDataAt(time: Long, schedulePacket: SchedulePacket, opMode: OpMode): CommandHolder<CommandSNeuPI> {
        if (!schedulePacket.sneupi) return CommandHolder(CommandSNeuPI.NULL)
        val dutyCycle = DutyCycleSNeuPI.fromValue(schedulePacket.dutyCycleSneupi ?: 0)
        val dutyCycleTime = time % dutyCycle.totalSeconds()

        val hvStatus: HVStatusSNeuPI
        val emissionMode: EmissionModeSNeuPI

        when (dutyCycleTime) {
            in 0L..dutyCycle.secondsOn() -> {
                hvStatus = HVStatusSNeuPI.HV_START
                emissionMode = schedulePacket.emissionModeSneupi ?: EmissionModeSNeuPI.NULL
            }
            in dutyCycle.secondsOn()..dutyCycle.secondsOff() -> {
                hvStatus = HVStatusSNeuPI.HV_OFF
                emissionMode = EmissionModeSNeuPI.EMISSION_OFF
            }
            else -> {
                throw RuntimeException("Unhandled SNeuPI startTime state: $dutyCycleTime")
            }
        }

        return CommandHolder(CommandSNeuPI(
                hvStatus = hvStatus,
                emissionMode = emissionMode
        ))
    }

    fun createLinasDataAt(time: Long, schedulePacket: SchedulePacket, opMode: OpMode): CommandHolder<CommandLINAS> {
        if (!schedulePacket.linas) return CommandHolder(CommandLINAS.NULL)
        val dutyCycle = DutyCycleLINAS.fromValue(schedulePacket.dutyCycleLinas ?: 0)
        val dutyCycleTime = time % dutyCycle.totalSeconds()

        val filamentOnOff: FilamentOnOffLINAS
        val filamentOnOff2: FilamentOnOffLINAS?

        when (dutyCycleTime) {
            0L -> { //ARM -> ON case
                filamentOnOff = FilamentOnOffLINAS.FILAMENT_ARM //2*96 1
                filamentOnOff2 = FilamentOnOffLINAS.FILAMENT_ON //2*96 2
            }
            in 0L..dutyCycle.secondsOn() -> {
                filamentOnOff = FilamentOnOffLINAS.FILAMENT_ON
                filamentOnOff2 = null
            }
            in dutyCycle.secondsOn()..dutyCycle.secondsOff() -> {
                filamentOnOff = FilamentOnOffLINAS.FILAMENT_OFF
                filamentOnOff2 = null
            }
            else -> {
                throw RuntimeException("Unhandled LINAS startTime state: $dutyCycleTime")
            }
        }

        if (filamentOnOff2 != null) {
            return CommandHolder(
                    CommandLINAS(
                            filamentSelect = schedulePacket.filamentSelectLinas ?: FilamentSelectLINAS.NULL,
                            gridBiasOnOff = GridBiasOnOffLINAS.GRID_BIAS_OFF,
                            gridBiasSetting = GridBiasSettingLINAS.GRID_BIAS_187V,
                            collectorGainState = schedulePacket.collectorGainStateLinas ?: CollectorGainStateLINAS.NULL,
                            filamentOnOff = filamentOnOff
                    ),
                    CommandLINAS(
                            filamentSelect = schedulePacket.filamentSelectLinas ?: FilamentSelectLINAS.NULL,
                            gridBiasOnOff = GridBiasOnOffLINAS.GRID_BIAS_OFF,
                            gridBiasSetting = GridBiasSettingLINAS.GRID_BIAS_187V,
                            collectorGainState = schedulePacket.collectorGainStateLinas ?: CollectorGainStateLINAS.NULL,
                            filamentOnOff = filamentOnOff2
                    )
            )
        }
        return CommandHolder(CommandLINAS(
                filamentSelect = schedulePacket.filamentSelectLinas ?: FilamentSelectLINAS.NULL,
                gridBiasOnOff = GridBiasOnOffLINAS.GRID_BIAS_OFF,
                gridBiasSetting = GridBiasSettingLINAS.GRID_BIAS_187V,
                collectorGainState = schedulePacket.collectorGainStateLinas ?: CollectorGainStateLINAS.NULL,
                filamentOnOff = filamentOnOff
        ))
    }

    private fun createPacket(commandLiib: CommandHolder<CommandLIIB>,
                             commandRpa: CommandHolder<CommandRPA>,
                             commandSneupi: CommandHolder<CommandSNeuPI>,
                             commandLinas: CommandHolder<CommandLINAS>): CommandPacket {
        if (commandLiib.isDouble() || commandRpa.isDouble() || commandSneupi.isDouble() || commandLinas.isDouble()) {
            return DoubleCommandPacket(
                    SingleCommandPacket(
                            commandLiib.first,
                            commandRpa.first,
                            commandSneupi.first,
                            commandLinas.first
                    ),
                    SingleCommandPacket(
                            commandLiib.second ?: commandLiib.first,
                            commandRpa.second ?: commandRpa.first,
                            commandSneupi.second ?: commandSneupi.first,
                            commandLinas.second ?: commandLinas.first
                    )
            )
        }
        return SingleCommandPacket(commandLiib.first, commandRpa.first, commandSneupi.first, commandLinas.first)
    }

    private fun populateEndTimes(packets: List<TimePacketPair>, scheduleEnd: Instant) {
        for (i in 0 until packets.size - 1) {
            packets[i].endTime = packets[i + 1].startTime //The end time of a packet is the start time of the packet after it
        }
        packets.lastOrNull()?.endTime = scheduleEnd //The end time of the last packet is the end time of the schedule
    }

    fun createCommandPackets(packetIn: Packet): List<TimePacketPair> {
        val startTime = packetIn.startTime.plusSeconds(2) //Allocate 2 seconds at the beginning for the duplicate packet
        val endTime = packetIn.endTime
        val schedulePacket = packetIn.schedulePacket
        val opMode = schedulePacket.identifyOpMode()

        var currentTime = startTime
        val packets = LinkedList<TimePacketPair>()
        while (currentTime.isBefore(endTime)) {
            val dt = startTime.until(currentTime, ChronoUnit.SECONDS) //Relative time in seconds from start to current work time
            //Every packet that relies on startTime should put a check for the 'firstPacket' parameter before handling the startTime itself

            val commandLiib = createLiibDataAt(dt, schedulePacket, opMode)
            val commandRpa = createRpaDataAt(dt, schedulePacket, opMode)
            val commandSneupi = createSneupiDataAt(dt, schedulePacket, opMode)
            val commandLinas = createLinasDataAt(dt, schedulePacket, opMode)

            val packet = createPacket(commandLiib, commandRpa, commandSneupi, commandLinas)
            if (packets.lastOrNull()?.isPacketEqual(packet) != true) { //If the new packet isn't equal to the last packet in the list
                packets.add(TimePacketPair(currentTime, packet = packet))
            }

            currentTime = currentTime.plusSeconds(2)
        }
        if (packets.size > 0) {
            packets.push(TimePacketPair(packets.first.startTime.minusSeconds(2), packet = packets.first.packet)) //Duplicate the first packet
        }
        populateEndTimes(packets, endTime) //Fill in the end times for each packet

        return packets
    }
}