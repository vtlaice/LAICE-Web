package edu.vt.ece.laice.web.backend.service

import edu.vt.ece.laice.web.backend.model.Packet
import edu.vt.ece.laice.web.backend.repository.PacketRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import java.time.Instant
import java.time.Month
import java.time.Year
import java.time.ZoneOffset
import java.time.temporal.ChronoUnit

@Service
class PacketService {
    @Autowired
    private lateinit var packetRepository: PacketRepository

    fun getAllPackets(): List<Packet> {
        return packetRepository.findAll()
    }

    fun getPacketById(id: Long): Packet? {
        return packetRepository.findById(id).orElseGet { null } //Convert an Optional to a Kotlin nullable
    }

    fun getLastPacket(): Packet? {
        return packetRepository.findFirstByOrderByIdDesc().orElseGet { null }
    }

    fun savePacket(packet: Packet) = packetRepository.save(packet)

    fun deletePacket(id: Long) = packetRepository.deleteById(id)

    /**
     * Fetches all of the packets whose times span between the given start or end time.
     * This includes packets that both start and/or end outside of the time range, but cross through it.
     */
    fun getPacketsInTimeRange(startTime: Instant, endTime: Instant): List<Packet> {
        return packetRepository.findAllByStartTimeLessThanEqualAndEndTimeGreaterThanEqual(endTime, startTime)
    }

    /**
     * Fetches all of the packets that cross through a given month and year.
     * Useful for populating a monthly view of a calendar.
     */
    fun getPacketsForMonth(month: Int, year: Int): List<Packet> {
        val monthObj = Month.of(month)
        val yearObj = Year.of(year)
        val startOfMonth = yearObj.atMonth(monthObj).atDay(1).atStartOfDay().toInstant(ZoneOffset.UTC)
        val endOfMonth = yearObj.atMonth(monthObj).atEndOfMonth().atTime(23, 59, 59, 999_999_999).toInstant(ZoneOffset.UTC)

        return getPacketsInTimeRange(startOfMonth, endOfMonth)
    }

    /**
     * Checks if a potential packet overlaps existing packets, inclusive
     * Returns true if the specified time range overlaps any existing packets
     */
    fun packetDoesNotOverlap(startTime: Instant, endTime: Instant, exclude: Long = -1L): Boolean {
        val inRange = getPacketsInTimeRange(startTime, endTime)
        if (inRange.isEmpty()) return true

        if (exclude != -1L) {
            return (inRange.size == 1 && inRange[0].id == exclude)
        }

        return false
    }

    /**
     * Gets the starting time for a new packet, which is either the
     * ending time of the last packet, or the current system time rounded to the nearest hour
     * if there are no existing packets.
     */
    fun getNewPacketStartingTime(): Instant {
        val packet = getLastPacket()
        if (packet != null) {
            return packet.endTime
        }
        return Instant.now().truncatedTo(ChronoUnit.HOURS)
    }

    /**
     * Checks if a packet is writable.  A packet is not writable if the start time has passed the current time
     */
    fun isPacketWritable(id: Long): Boolean {
        val now = Instant.now()
        val packet = packetRepository.findById(id).orElseGet { null } ?: return false
        if (!packet.startTime.isAfter(now)) return false
        return true
    }
}