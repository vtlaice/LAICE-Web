package edu.vt.ece.laice.web.backend.packet

import java.util.zip.CRC32

data class Packet(val commandLIIB: CommandLIIB,
                  val commandRPA: CommandRPA,
                  val commandSNeuPI: CommandSNeuPI,
                  val commandLINAS: CommandLINAS): BinString {
    override val bin = commandLIIB.bin + commandRPA.bin + commandSNeuPI.bin + commandLINAS.bin

    fun crc32(): Long {
        val crc = CRC32()
        crc.update(bin.toByteArray())
        return crc.value
    }
}