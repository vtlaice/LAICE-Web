package edu.vt.ece.laice.web.backend.packet

import com.fasterxml.jackson.annotation.JsonIgnore
import java.util.zip.CRC32

data class SingleCommandPacket(val commandLIIB: CommandLIIB,
                               val commandRPA: CommandRPA = CommandRPA(),
                               val commandSNeuPI: CommandSNeuPI = CommandSNeuPI(),
                               val commandLINAS: CommandLINAS = CommandLINAS()): CommandPacket {
    companion object {
            @JsonIgnore
            val NULL = SingleCommandPacket(
                    CommandLIIB.NULL,
                    CommandRPA.NULL,
                    CommandSNeuPI.NULL,
                    CommandLINAS.NULL
            )
    }

    override fun bin() = commandLIIB.bin() + commandRPA.bin() + commandSNeuPI.bin() + commandLINAS.bin()
}