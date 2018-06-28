package edu.vt.ece.laice.web.backend.packet

import java.util.zip.CRC32

interface CommandPacket: BinString {
    fun crc32(): Long {
        val crc = CRC32()
        crc.update(bin().toByteArray())
        return crc.value
    }
}