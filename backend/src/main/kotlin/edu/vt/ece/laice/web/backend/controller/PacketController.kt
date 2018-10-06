package edu.vt.ece.laice.web.backend.controller

import edu.vt.ece.laice.web.backend.exception.ResourceNotFoundException
import edu.vt.ece.laice.web.backend.intrinsics.Intrinsics
import edu.vt.ece.laice.web.backend.model.Packet
import edu.vt.ece.laice.web.backend.payload.ApiResponse
import edu.vt.ece.laice.web.backend.payload.SchedulePacketRequest
import edu.vt.ece.laice.web.backend.payload.TimeResponse
import edu.vt.ece.laice.web.backend.repository.PacketRepository
import edu.vt.ece.laice.web.backend.service.PacketService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/packet")
class PacketController {
    @Autowired
    private lateinit var packetService: PacketService

    @PostMapping("/schedulePacket")
    @PreAuthorize("hasRole('SCHEDULE_PACKET')")
    fun schedulePacket(@RequestBody request: SchedulePacketRequest): ResponseEntity<*> {
        if (!Intrinsics.verifyStartTime(request.startTime)) {
            return ResponseEntity.badRequest().body(ApiResponse(false, "Packet start time has already elapsed"))
        }
        if (!Intrinsics.verifyTimeRange(request.startTime, request.endTime)) {
            return ResponseEntity.badRequest().body(ApiResponse(false, "End time is not after start time"))
        }
        if (!Intrinsics.verifySchedulePacket(request.schedulePacket)) {
            return ResponseEntity.badRequest().body(ApiResponse(false, "Packet structure is invalid"))
        }
        if (!packetService.packetDoesNotOverlap(request.startTime, request.endTime)) {
            return ResponseEntity.badRequest().body(ApiResponse(false, "Packet overlaps existing packets"))
        }

        val packet = Packet(
                startTime = request.startTime,
                endTime = request.endTime,
                schedulePacket = request.schedulePacket
        )

        packetService.savePacket(packet) //Add the packet to the repository
        return ResponseEntity.ok(ApiResponse(true, "Scheduled packet '${request.schedulePacket.name()}'"))
    }

    @GetMapping("/getNewPacketStartTime")
    @PreAuthorize("hasRole('SCHEDULE_PACKET')")
    fun getNewPacketStartTime(): ResponseEntity<*> {
        val response = TimeResponse(packetService.getNewPacketStartingTime())
        return ResponseEntity.ok(response)
    }

    @GetMapping("/getPacket/{id}")
    @PreAuthorize("hasRole('SCHEDULE_PACKET')")
    fun getPacket(@PathVariable id: Long): ResponseEntity<*> {
        val packet = packetService.getPacketById(id) ?: throw ResourceNotFoundException("Packet", "id", id)

        return ResponseEntity.ok(packet)
    }

    @PostMapping("/updatePacket/{id}")
    @PreAuthorize("hasRole('SCHEDULE_PACKET')")
    fun updatePacket(@RequestBody request: SchedulePacketRequest, @PathVariable id: Long): ResponseEntity<*> {
        if (!packetService.isPacketWritable(id)) {
            return ResponseEntity.badRequest().body(ApiResponse(false, "Packet is no longer writable"))
        }
        if (!Intrinsics.verifyStartTime(request.startTime)) {
            return ResponseEntity.badRequest().body(ApiResponse(false, "Packet start time has already elapsed"))
        }
        if (!Intrinsics.verifyTimeRange(request.startTime, request.endTime)) {
            return ResponseEntity.badRequest().body(ApiResponse(false, "End time is not after start time"))
        }
        if (!Intrinsics.verifySchedulePacket(request.schedulePacket)) {
            return ResponseEntity.badRequest().body(ApiResponse(false, "Packet structure is invalid"))
        }
        if (!packetService.packetDoesNotOverlap(request.startTime, request.endTime, id)) {
            return ResponseEntity.badRequest().body(ApiResponse(false, "Packet overlaps existing packets"))
        }

        val packet = packetService.getPacketById(id) ?: throw ResourceNotFoundException("Packet", "id", id)

        //Update mutable fields
        packet.startTime = request.startTime
        packet.endTime = request.endTime
        packet.schedulePacket = request.schedulePacket

        packetService.savePacket(packet)
        return ResponseEntity.ok(ApiResponse(true, "Saved packet '${request.schedulePacket.name()}'"))
    }

    @GetMapping("/deletePacket/{id}")
    @PreAuthorize("hasRole('SCHEDULE_PACKET')")
    fun deletePacket(@PathVariable id: Long): ResponseEntity<*> {
        if (!packetService.isPacketWritable(id)) {
            return ResponseEntity.badRequest().body(ApiResponse(false, "Packet is no longer writable"))
        }
        val packet = packetService.deletePacket(id)
        return ResponseEntity.ok(ApiResponse(true, "Packet deleted"))
    }
}