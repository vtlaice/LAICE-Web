package edu.vt.ece.laice.web.backend.payload

import edu.vt.ece.laice.web.backend.packet.*
import java.time.Instant

data class SchedulePacketRequest(val startTime: Instant,
                                 val endTime: Instant,
                                 val schedulePacket: SchedulePacket)