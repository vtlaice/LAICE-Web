package edu.vt.ece.laice.web.backend.service

import edu.vt.ece.laice.web.backend.model.Packet
import edu.vt.ece.laice.web.backend.repository.PacketRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import java.time.Instant
import java.time.Month
import java.time.Year
import java.time.ZoneOffset

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
}