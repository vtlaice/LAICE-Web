package edu.vt.ece.laice.web.backend.payload

import java.time.Instant

data class PacketSummaryResponse(val id: Long,
                                 val time: Instant,
                                 val name: String,
                                 val createdAt: Instant,
                                 val lastModifiedAt: Instant,
                                 val createdBy: Long,
                                 val lastModifiedBy: Long)