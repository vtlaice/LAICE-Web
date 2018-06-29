package edu.vt.ece.laice.web.backend.packet

data class SchedulePacket(val liibMode: LIIBMode,
                          val rpa: Boolean,
                          val linas: Boolean,
                          val sneupi: Boolean,
                          val rg2ModeRpa: RG2ModeRPA?,
                          val sweepModeRpa: SweepModeRPA?,
                          val dutyCycleLinas: Int?,
                          val filamentSelectLinas: FilamentSelectLINAS?,
                          val collectorGainStateLinas: CollectorGainStateLINAS?,
                          val dutyCycleSneupi: Int?,
                          val emissionModeSneupi: EmissionModeSNeuPI?) {
    companion object {
        val NULL = SchedulePacket(
                LIIBMode.NULL,
                false,
                false,
                false,
                RG2ModeRPA.NULL,
                SweepModeRPA.NULL,
                0,
                FilamentSelectLINAS.NULL,
                CollectorGainStateLINAS.NULL,
                0,
                EmissionModeSNeuPI.NULL
        )
    }

    /**
     * Creates an OpMode from the 3 on/off state parameters
     */
    fun identifyOpMode(): OpMode {
        return when {
            (!rpa && !linas && !sneupi) -> OpMode.SAFE
            (sneupi && !rpa && !linas) -> OpMode.SNEUPI_ON
            (linas && !rpa && !sneupi) -> OpMode.LINAS_ON
            (linas && sneupi && !rpa) -> OpMode.NEUTRAL
            (rpa && !linas && !sneupi) -> OpMode.PLASMA
            (rpa && sneupi && !linas) -> OpMode.HIGH_RES_CORRELATION
            (rpa && linas && !sneupi) -> OpMode.LOW_RES_CORRELATION
            (rpa && linas && sneupi) -> OpMode.PRIME_SCIENCE
            else -> OpMode.NULL
        }
    }

    /**
     * Produces the "human readable" name for this packet
     */
    fun name(): String {
        //Handle thermal knife modes
        when (liibMode) {
            LIIBMode.TK1_CHARGE -> return "TK1C"
            LIIBMode.TK1_DISCHARGE -> return "TK1D"
            LIIBMode.TK2_CHARGE -> return "TK2C"
            LIIBMode.TK2_DISCHARGE -> return "TK2D"
            LIIBMode.TK_OVERRIDE -> return "TKO"
            else -> {}
        }

        //Handle standby mode
        val opMode = identifyOpMode()
        if (opMode == OpMode.SAFE) return "NStdby"

        //Build full instrument string
        val builder = StringBuilder()
        if (rpa) {
            builder.append("R")
            when (sweepModeRpa) {
                SweepModeRPA.LINEAR_SWEEP -> builder.append("l")
                SweepModeRPA.CONSTANT_VOLTAGE -> builder.append("c")
                SweepModeRPA.SMART_SWEEP -> builder.append("s")
                else -> {}
            }
            when (rg2ModeRpa) {
                RG2ModeRPA.APERTURE -> builder.append("a")
                RG2ModeRPA.RETARDING -> builder.append("r")
                else -> {}
            }
        }

        if (linas) {
            builder.append("L")
            builder.append(dutyCycleLinas)

            when (collectorGainStateLinas) {
                CollectorGainStateLINAS.SWITCH_GAIN_STATE -> builder.append("s")
                CollectorGainStateLINAS.LOW_PRESSURE_SENSITIVE -> builder.append("l")
                CollectorGainStateLINAS.HIGH_PRESSURE_SENSITIVE -> builder.append("h")
                else -> {}
            }

            when (filamentSelectLinas) {
                FilamentSelectLINAS.FILAMENT_1 -> builder.append("1")
                FilamentSelectLINAS.FILAMENT_2 -> builder.append("2")
                else -> {}
            }
        }

        if (sneupi) {
            builder.append("S")
            builder.append(dutyCycleSneupi)

            when (emissionModeSneupi) {
                EmissionModeSNeuPI.SWEEP_EMISSION -> builder.append("s")
                EmissionModeSNeuPI.EMISSION_OFF -> builder.append("sb")
                EmissionModeSNeuPI.EMISSION_LEVEL_A -> builder.append("a")
                EmissionModeSNeuPI.EMISSION_LEVEL_C -> builder.append("c")
                else -> {}
            }
        }

        return builder.toString()
    }
}