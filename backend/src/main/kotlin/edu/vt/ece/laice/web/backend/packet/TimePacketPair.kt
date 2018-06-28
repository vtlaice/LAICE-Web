package edu.vt.ece.laice.web.backend.packet

import java.time.Instant

data class TimePacketPair(val startTime: Instant, var endTime: Instant = Instant.EPOCH, val packet: CommandPacket) {


    fun isPacketEqual(other: CommandPacket): Boolean {
        return other == packet
    }
}