package edu.vt.ece.laice.web.backend.model

import com.vladmihalcea.hibernate.type.json.JsonStringType
import edu.vt.ece.laice.web.backend.model.audit.UserDateAudit
import edu.vt.ece.laice.web.backend.packet.SchedulePacket
import org.hibernate.annotations.Type
import org.hibernate.annotations.TypeDef
import org.hibernate.annotations.TypeDefs
import java.time.Instant
import javax.persistence.*

/**
 * Name is somewhat misleading, this entity represents a single *schedule* entry.
 * From this, multiple "command packets" will be created to fulfill the schedule
 */
@TypeDefs(TypeDef(name = "json", typeClass = JsonStringType::class))
@Entity
@Table(name = "packets")
data class Packet(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        var id: Long = 0L,

        var startTime: Instant = Instant.EPOCH,
        var endTime: Instant = Instant.EPOCH,

        @Type(type = "json")
        @Column(columnDefinition = "json")
        var schedulePacket: SchedulePacket = SchedulePacket.NULL,

        var exported: Boolean = false
): UserDateAudit()