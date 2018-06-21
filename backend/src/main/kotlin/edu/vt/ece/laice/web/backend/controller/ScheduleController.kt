package edu.vt.ece.laice.web.backend.controller

import edu.vt.ece.laice.web.backend.exception.ResourceNotFoundException
import edu.vt.ece.laice.web.backend.payload.PacketSummaryResponse
import edu.vt.ece.laice.web.backend.repository.PacketRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/schedule")
class ScheduleController {
    @Autowired
    private lateinit var packetRepository: PacketRepository

    @GetMapping("/all")
    @PreAuthorize("hasRole('VIEW_SCHEDULE')")
    fun getAllPackets(): ResponseEntity<*> {
        val packets = packetRepository.findAll()
        val response = packets.map { PacketSummaryResponse(it.id, it.time, it.commandPacket.name(), it.createdAt, it.updatedAt, it.createdBy, it.updatedBy) }
        return ResponseEntity.ok(response)
    }

    @GetMapping("/packet/{id}")
    @PreAuthorize("hasRole('VIEW_SCHEDULE')")
    fun getPacket(@PathVariable id: Long): ResponseEntity<*> {
        val packet = packetRepository.findById(id).orElseThrow { ResourceNotFoundException("Packet", "id", id) }
        val response = PacketSummaryResponse(packet.id, packet.time, packet.commandPacket.name(), packet.createdAt, packet.updatedAt, packet.createdBy, packet.updatedBy)
        return ResponseEntity.ok(response)
    }
}