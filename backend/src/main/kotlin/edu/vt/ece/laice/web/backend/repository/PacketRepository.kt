package edu.vt.ece.laice.web.backend.repository


import edu.vt.ece.laice.web.backend.model.Packet
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository
import java.time.Instant

@Repository
interface PacketRepository: JpaRepository<Packet, Long> {
    fun findAllByStartTimeLessThanEqualAndEndTimeGreaterThanEqual(end: Instant, start: Instant): List<Packet>
}