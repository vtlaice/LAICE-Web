package edu.vt.ece.laice.web.backend.controller

import edu.vt.ece.laice.web.backend.exception.ResourceNotFoundException
import edu.vt.ece.laice.web.backend.model.Packet
import edu.vt.ece.laice.web.backend.packet.CSVGenerator
import edu.vt.ece.laice.web.backend.payload.ExportPacketResponse
import edu.vt.ece.laice.web.backend.payload.PacketSummaryResponse
import edu.vt.ece.laice.web.backend.repository.UserRepository
import edu.vt.ece.laice.web.backend.service.PacketService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.time.Instant
import java.time.Month
import java.time.Year
import java.time.ZoneOffset

@RestController
@RequestMapping("/api/schedule")
class ScheduleController {
    @Autowired
    private lateinit var packetService: PacketService

    @Autowired
    private lateinit var userRepository: UserRepository

    private fun idToName(id: Long): String {
        val user = userRepository.findById(id).orElseThrow { ResourceNotFoundException("User", "id", id) }
        return "${user.firstName} ${user.lastName}"
    }

    @GetMapping("/all")
    @PreAuthorize("hasRole('VIEW_SCHEDULE')")
    fun getAllPackets(): ResponseEntity<*> {
        val packets = packetService.getAllPackets()
        val response = packets.map { PacketSummaryResponse(it.id, it.startTime, it.endTime, it.schedulePacket.name(), it.schedulePacket.identifyOpMode(), it.exported, it.createdAt, it.updatedAt, idToName(it.createdBy), idToName(it.updatedBy)) }
        return ResponseEntity.ok(response)
    }

    @GetMapping("/packet/{id}")
    @PreAuthorize("hasRole('VIEW_SCHEDULE')")
    fun getPacket(@PathVariable id: Long): ResponseEntity<*> {
        val packet = packetService.getPacketById(id) ?: throw ResourceNotFoundException("Packet", "id", id)
        val response = PacketSummaryResponse(packet.id, packet.startTime, packet.endTime, packet.schedulePacket.name(), packet.schedulePacket.identifyOpMode(), packet.exported, packet.createdAt, packet.updatedAt, idToName(packet.createdBy), idToName(packet.updatedBy))
        return ResponseEntity.ok(response)
    }

    @GetMapping("/calendarPage/{month}/{year}")
    @PreAuthorize("hasRole('VIEW_SCHEDULE')")
    fun getPacketsForMonth(@PathVariable month: Int, @PathVariable year: Int): ResponseEntity<*> {
        val packets = packetService.getPacketsForMonth(month, year)

        val response = packets.map { PacketSummaryResponse(it.id, it.startTime, it.endTime, it.schedulePacket.name(), it.schedulePacket.identifyOpMode(), it.exported, it.createdAt, it.updatedAt, idToName(it.createdBy), idToName(it.updatedBy)) }
        return ResponseEntity.ok(response)
    }

    @GetMapping("/export/{id}")
    @PreAuthorize("hasRole('EXPORT_PACKET')")
    fun exportPacket(@PathVariable id: Long): ResponseEntity<*> {
        val packet = packetService.getPacketById(id) ?: throw ResourceNotFoundException("Packet", "id", id)

        val response = ExportPacketResponse(CSVGenerator.createCSVLines(packet), "${packet.startTime.epochSecond}.csv")

        packet.exported = true
        packetService.savePacket(packet) //Mark packet as exported

        return ResponseEntity.ok(response)
    }

}