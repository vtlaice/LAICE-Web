package edu.vt.ece.laice.web.backend.packet

enum class StartWordLIIB(override val bin: String): BinEnum {
    NULL                  ("00000000"),
    NORMAL_OPERATION_LIIB ("01000011")
}

enum class LIIBMode(override val bin: String): BinEnum {
    NULL                  ("00000"),
    NORMAL_MODE           ("00000"),
    TK1_CHARGE            ("00111"),
    TK1_DISCHARGE         ("01010"),
    TK2_CHARGE            ("11100"),
    TK2_DISCHARGE         ("10101"),
    TK_OVERRIDE           ("11011")
}

enum class OpMode(override val bin: String): BinEnum {
    NULL                  ("000"),
    SAFE                  ("000"), //Instruments OFF
    SNEUPI_ON             ("001"),
    LINAS_ON              ("010"),
    NEUTRAL               ("011"), //LINAS, SNeuPI ON
    PLASMA                ("100"), //RPA ON
    HIGH_RES_CORRELATION  ("101"), //RPA, SNeuPI ON
    LOW_RES_CORRELATION   ("110"), //RPA, LINAS ON
    PRIME_SCIENCE         ("111") //All Instruments ON
}

data class CommandLIIB(val startWord: StartWordLIIB = StartWordLIIB.NORMAL_OPERATION_LIIB,
                       val liibMode: LIIBMode,
                       val opMode: OpMode): BinString {
    override fun bin() = startWord.bin + liibMode.bin + opMode.bin
}