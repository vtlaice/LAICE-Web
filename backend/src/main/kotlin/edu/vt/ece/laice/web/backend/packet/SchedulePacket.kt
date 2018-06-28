package edu.vt.ece.laice.web.backend.packet

data class SchedulePacket(val liibMode: LIIBMode,
                          val rpa: Boolean,
                          val linas: Boolean,
                          val sneupi: Boolean,
                          val rG2ModeRpa: RG2ModeRPA,
                          val sweepModeRpa: SweepModeRPA,
                          val dutyCycleLinas: Int,
                          val filamentSelectLinas: FilamentSelectLINAS,
                          val collectorGainStateLinas: CollectorGainStateLINAS,
                          val dutyCycleSneupi: Int,
                          val emissionModeSneupi: EmissionModeSNeuPI) {
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
}