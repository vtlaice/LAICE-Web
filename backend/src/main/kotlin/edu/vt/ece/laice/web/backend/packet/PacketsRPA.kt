package edu.vt.ece.laice.web.backend.packet

enum class StartWordRPA(override val bin: String): BinEnum {
    NULL             ("00000000"),
    START_WORD_RPA   ("10101010")
}

enum class StepSizeRPA(override val bin: String): BinEnum {
    NULL             ("0000000000000000"),
    ION_TRAP         ("0000000000000000"),
    STEP_SIZE_PPS_64 ("0000010000000000")
}

enum class PointPerSweepRPA(override val bin: String): BinEnum {
    NULL             ("00000000"),
    PPS_64           ("01000000")
}

enum class RG2ModeRPA(override val bin: String): BinEnum {
    NULL             ("0"),
    RETARDING        ("0"),
    APERTURE         ("1")
}

enum class SweepModeRPA(override val bin: String): BinEnum {
    NULL             ("00"),
    LINEAR_SWEEP     ("00"),
    CONSTANT_VOLTAGE ("01"),
    SMART_SWEEP      ("10")
}

data class CommandRPA(val startWord: StartWordRPA = StartWordRPA.START_WORD_RPA,
                      val stepSize: StepSizeRPA = StepSizeRPA.NULL,
                      val pointsPerSweep: PointPerSweepRPA = PointPerSweepRPA.NULL,
                      val zeroPadding: String = "00000",
                      val rg2Mode: RG2ModeRPA = RG2ModeRPA.NULL,
                      val sweepMode: SweepModeRPA = SweepModeRPA.NULL): BinString {
    override fun bin() = startWord.bin + stepSize.bin + pointsPerSweep.bin + zeroPadding + rg2Mode.bin + sweepMode.bin
}