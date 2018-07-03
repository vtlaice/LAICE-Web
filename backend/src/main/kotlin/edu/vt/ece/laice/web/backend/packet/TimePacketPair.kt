package edu.vt.ece.laice.web.backend.packet

import java.time.Instant
import java.time.temporal.ChronoUnit

data class TimePacketPair(val startTime: Instant, var endTime: Instant = Instant.EPOCH, val packet: DoubleCommandPacket) {
    fun isPacketEqual(other: CommandPacket): Boolean {
        return other == packet
    }

    /**
     * Calculates the duration, in seconds, of this command packet.
     */
    fun getDuration(): Long {
        return startTime.until(endTime, ChronoUnit.SECONDS)
    }
}