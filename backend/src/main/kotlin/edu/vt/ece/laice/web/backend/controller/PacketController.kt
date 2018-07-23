package edu.vt.ece.laice.web.backend.controller

import edu.vt.ece.laice.web.backend.intrinsics.Intrinsics
import edu.vt.ece.laice.web.backend.model.Packet
import edu.vt.ece.laice.web.backend.payload.ApiResponse
import edu.vt.ece.laice.web.backend.payload.SchedulePacketRequest
import edu.vt.ece.laice.web.backend.repository.PacketRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/packet")
class PacketController {
    @Autowired
    private lateinit var packetRepository: PacketRepository

    @PostMapping("/schedulePacket")
    @PreAuthorize("hasRole('VIEW_SCHEDULE')") //TODO change back to SCHEDULE_PACKET
    fun schedulePacket(@RequestBody request: SchedulePacketRequest): ResponseEntity<*> {
        if (!Intrinsics.verifyTimeRange(request.startTime, request.endTime)) {
            return ResponseEntity.badRequest().body(ApiResponse(false, "End time is not after start time"))
        }
        if (!Intrinsics.verifySchedulePacket(request.schedulePacket)) {
            return ResponseEntity.badRequest().body(ApiResponse(false, "Packet structure is invalid"))
        }

        val packet = Packet(
                startTime = request.startTime,
                endTime = request.endTime,
                schedulePacket = request.schedulePacket
        )

        packetRepository.save(packet) //Add the packet to the repository
        return ResponseEntity.ok(ApiResponse(true, "Scheduled packet '${request.schedulePacket.name()}'"))
    }
}