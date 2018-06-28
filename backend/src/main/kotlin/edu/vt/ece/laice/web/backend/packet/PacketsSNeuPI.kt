package edu.vt.ece.laice.web.backend.packet

enum class StartWordSNeuPI(override val bin: String): BinEnum {
    NULL              ("00000000"),
    START_WORD_SNEUPI ("01010011")
}

enum class HVStatusSNeuPI(override val bin: String): BinEnum {
    NULL              ("0"),
    HV_OFF            ("0"),
    HV_START          ("1")
}

enum class EmissionModeSNeuPI(override val bin: String): BinEnum {
    NULL              ("00"),
    SWEEP_EMISSION    ("00"),
    EMISSION_OFF      ("01"),
    EMISSION_LEVEL_A  ("10"),
    EMISSION_LEVEL_C  ("11")
}

data class CommandSNeuPI(val startWord: StartWordSNeuPI = StartWordSNeuPI.START_WORD_SNEUPI,
                         val zeroPadding: String = "00000",
                         val hvStatus: HVStatusSNeuPI = HVStatusSNeuPI.NULL,
                         val emissionMode: EmissionModeSNeuPI = EmissionModeSNeuPI.NULL): BinString {
    companion object {
        val NULL = CommandSNeuPI(
                StartWordSNeuPI.NULL,
                "00000",
                HVStatusSNeuPI.NULL,
                EmissionModeSNeuPI.NULL
        )
    }

    override fun bin() = startWord.bin + zeroPadding + hvStatus.bin + emissionMode.bin
}