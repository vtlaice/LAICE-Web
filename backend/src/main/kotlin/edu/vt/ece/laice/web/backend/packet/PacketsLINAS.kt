package edu.vt.ece.laice.web.backend.packet

enum class FilamentSelectLINAS(override val bin: String): BinString {
    NULL                    ("0"),
    FILAMENT_1              ("1"),
    FILAMENT_2              ("0")
}

enum class GridBiasOnOffLINAS(override val bin: String): BinString {
    NULL                    ("0"),
    GRID_BIAS_OFF           ("0"),
    GRID_BIAS_ON            ("1") //Not sure if this exists
}

enum class GridBiasSettingLINAS(override val bin: String): BinString {
    NULL                    ("0000"),
    GRID_BIAS_187V          ("0010")
}

enum class CollectorGainStateLINAS(override val bin: String): BinString {
    NULL                    ("000000"),
    SWITCH_GAIN_STATE       ("001010"),
    LOW_PRESSURE_SENSITIVE  ("001001"),
    HIGH_PRESSURE_SENSITIVE ("010010")
}

enum class FilamentOnOffLINAS(override val bin: String): BinString {
    NULL                    ("0000"),
    FILAMENT_OFF            ("0000"),
    FILAMENT_ARM            ("0110"),
    FILAMENT_ON             ("1001")
}

enum class EndWordLINAS(override val bin: String): BinString {
    NULL                    ("00000000"),
    END_WORD_LINAS          ("11111010")
}

data class CommandLINAS(val filamentSelect: FilamentSelectLINAS,
                        val gridBiasOnOff: GridBiasOnOffLINAS,
                        val gridBiasSetting: GridBiasSettingLINAS,
                        val collectorGainState: CollectorGainStateLINAS,
                        val filamentOnOff: FilamentOnOffLINAS,
                        val endWord: EndWordLINAS = EndWordLINAS.END_WORD_LINAS): BinString {
    override val bin = filamentSelect.bin + gridBiasOnOff.bin + gridBiasSetting.bin + collectorGainState.bin + filamentOnOff.bin + endWord.bin
}