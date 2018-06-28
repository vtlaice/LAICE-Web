package edu.vt.ece.laice.web.backend.packet

import java.util.zip.CRC32

data class DoubleCommandPacket(val first: SingleCommandPacket, val second: SingleCommandPacket): CommandPacket {
    override fun bin(): String {
        return first.bin() + second.bin()
    }

    /**
     * Shrinks this packet down to a SingleCommandPacket if possible
     * Otherwise, returns this packet
     */
    fun shrink(): CommandPacket {
        if (first == second) {
            return first
        }
        return this
    }
}