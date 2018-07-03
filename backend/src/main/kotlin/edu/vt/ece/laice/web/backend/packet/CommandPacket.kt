package edu.vt.ece.laice.web.backend.packet

import java.util.zip.CRC32

interface CommandPacket: BinString {
    fun crc32(): Long {
        val crc = CRC32()
        crc.update(bin().toByteArray())
        return crc.value
    }

    /**
     * Quick fix to UIUC requiring 2 strings for each state change.
     * This will expand a single packet to a double packet if it isn't one already
     */
    fun expand(): DoubleCommandPacket {
        if (this is DoubleCommandPacket) return this
        if (this is SingleCommandPacket) return DoubleCommandPacket(this, this)
        throw UnsupportedOperationException("Invalid command packet type")
    }
}