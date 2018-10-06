package edu.vt.ece.laice.web.backend.payload

import edu.vt.ece.laice.web.backend.packet.OpMode
import java.time.Instant

data class PacketSummaryResponse(val id: Long,
                                 val startTime: Instant,
                                 val endTime: Instant,
                                 val name: String,
                                 val opMode: OpMode,
                                 val exported: Boolean,
                                 val createdAt: Instant,
                                 val lastModifiedAt: Instant,
                                 val createdBy: String,
                                 val lastModifiedBy: String,
                                 val writable: Boolean)