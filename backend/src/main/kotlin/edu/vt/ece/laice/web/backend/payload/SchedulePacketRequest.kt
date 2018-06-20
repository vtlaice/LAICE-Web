package edu.vt.ece.laice.web.backend.payload

import edu.vt.ece.laice.web.backend.packet.CommandPacket
import java.time.Instant

data class SchedulePacketRequest(val time: Instant,
                                 val commandPacket: CommandPacket)