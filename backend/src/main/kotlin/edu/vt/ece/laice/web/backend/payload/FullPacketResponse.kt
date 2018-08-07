package edu.vt.ece.laice.web.backend.payload

import edu.vt.ece.laice.web.backend.packet.SchedulePacket
import java.time.Instant

/**
 * @author Cameron Earle
 * @version 8/7/2018
 *
 */
data class FullPacketResponse(val startTime: Instant,
                              val endTime: Instant,
                              val schedulePacket: SchedulePacket)