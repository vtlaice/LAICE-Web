package edu.vt.ece.laice.web.backend.controller

import edu.vt.ece.laice.web.backend.model.Packet
import edu.vt.ece.laice.web.backend.payload.SchedulePacketRequest
import edu.vt.ece.laice.web.backend.repository.PacketRepository
import org.springframework.beans.factory.annotation.Autowired
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
    fun schedulePacket(@RequestBody request: SchedulePacketRequest) {
        val packet = Packet(
                time = request.time,
                commandPacket = request.commandPacket,
                crc32 = request.commandPacket.crc32()
        )

        packetRepository.save(packet) //Add the packet to the repository
    }
}