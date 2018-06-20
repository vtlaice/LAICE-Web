package edu.vt.ece.laice.web.backend

import edu.vt.ece.laice.web.backend.model.Packet
import edu.vt.ece.laice.web.backend.packet.*
import edu.vt.ece.laice.web.backend.repository.PacketRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.autoconfigure.domain.EntityScan
import org.springframework.boot.runApplication
import org.springframework.data.jpa.convert.threeten.Jsr310JpaConverters
import org.springframework.stereotype.Component
import java.time.Instant
import java.util.*
import javax.annotation.PostConstruct

@SpringBootApplication
@EntityScan(basePackageClasses = [Application::class, Jsr310JpaConverters::class])
class Application {
    @PostConstruct
    fun init() {
        TimeZone.setDefault(TimeZone.getTimeZone("UTC"))
    }
}

fun main(args: Array<String>) {
    runApplication<Application>(*args)
}


@Component
class TestComponent {
    @Autowired
    lateinit var packetRepository: PacketRepository

    @PostConstruct
    fun addTestPacket() {
/*
        val cmd = CommandPacket(
                CommandLIIB(
                        liibMode = LIIBMode.NORMAL_MODE,
                        opMode = OpMode.PRIME_SCIENCE
                ),
                CommandRPA(
                        stepSize = StepSizeRPA.STEP_SIZE_PPS_64,
                        pointsPerSweep = PointPerSweepRPA.PPS_64,
                        rg2Mode = RG2ModeRPA.APERTURE,
                        sweepMode = SweepModeRPA.LINEAR_SWEEP
                ),
                CommandSNeuPI(
                        hvStatus = HVStatusSNeuPI.HV_START,
                        emissionMode = EmissionModeSNeuPI.EMISSION_OFF
                ),
                CommandLINAS(
                        filamentSelect = FilamentSelectLINAS.FILAMENT_1,
                        gridBiasOnOff = GridBiasOnOffLINAS.GRID_BIAS_OFF,
                        gridBiasSetting = GridBiasSettingLINAS.GRID_BIAS_187V,
                        collectorGainState = CollectorGainStateLINAS.HIGH_PRESSURE_SENSITIVE,
                        filamentOnOff = FilamentOnOffLINAS.FILAMENT_ON
                )
        )
        val packet = Packet(time = Instant.now(), commandPacket = cmd, crc32 = cmd.crc32())
        packetRepository.save(packet)
        println("ADDED TEST PACKET")
*/

/*
        val packet = packetRepository.findById(1).get()
        println(packet)
        println("BIN: ${packet.commandPacket.bin()}")
        */

    }
}