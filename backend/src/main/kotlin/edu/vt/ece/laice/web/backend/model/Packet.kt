package edu.vt.ece.laice.web.backend.model

import com.vladmihalcea.hibernate.type.json.JsonStringType
import edu.vt.ece.laice.web.backend.model.audit.UserDateAudit
import edu.vt.ece.laice.web.backend.packet.SchedulePacket
import org.hibernate.annotations.Type
import org.hibernate.annotations.TypeDef
import org.hibernate.annotations.TypeDefs
import java.time.Instant
import javax.persistence.*

@TypeDefs(TypeDef(name = "json", typeClass = JsonStringType::class))
@Entity
@Table(name = "packets")
data class Packet(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Long = 0L,

        val startTime: Instant = Instant.EPOCH,

        val endTime: Instant = Instant.EPOCH,

        @Type(type = "json")
        @Column(columnDefinition = "json")
        val schedulePacket: SchedulePacket = SchedulePacket.NULL
        ): UserDateAudit()