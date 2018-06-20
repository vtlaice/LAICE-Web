package edu.vt.ece.laice.web.backend.packet

import com.fasterxml.jackson.annotation.JsonIgnore
import java.util.zip.CRC32

data class CommandPacket(val commandLIIB: CommandLIIB,
                         val commandRPA: CommandRPA,
                         val commandSNeuPI: CommandSNeuPI,
                         val commandLINAS: CommandLINAS): BinString {
    companion object {
            @JsonIgnore
            val NULL = CommandPacket(
                    CommandLIIB(
                            StartWordLIIB.NULL,
                            LIIBMode.NULL,
                            OpMode.NULL
                    ),
                    CommandRPA(
                            StartWordRPA.NULL,
                            StepSizeRPA.NULL,
                            PointPerSweepRPA.NULL,
                            "00000",
                            RG2ModeRPA.NULL,
                            SweepModeRPA.NULL
                    ),
                    CommandSNeuPI(
                            StartWordSNeuPI.NULL,
                            "00000",
                            HVStatusSNeuPI.NULL,
                            EmissionModeSNeuPI.NULL
                    ),
                    CommandLINAS(
                            FilamentSelectLINAS.NULL,
                            GridBiasOnOffLINAS.NULL,
                            GridBiasSettingLINAS.NULL,
                            CollectorGainStateLINAS.NULL,
                            FilamentOnOffLINAS.NULL,
                            EndWordLINAS.NULL
                    )
            )
    }

    override val bin = commandLIIB.bin + commandRPA.bin + commandSNeuPI.bin + commandLINAS.bin

    fun crc32(): Long {
        val crc = CRC32()
        crc.update(bin.toByteArray())
        return crc.value
    }
}