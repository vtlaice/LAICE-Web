package edu.vt.ece.laice.web.backend.model

import com.vladmihalcea.hibernate.type.json.JsonBinaryType
import com.vladmihalcea.hibernate.type.json.JsonStringType
import edu.vt.ece.laice.web.backend.model.audit.UserDateAudit
import edu.vt.ece.laice.web.backend.packet.CommandPacket
import org.hibernate.annotations.NaturalId
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

        @NaturalId
        val time: Instant = Instant.EPOCH,

        @Type(type = "json")
        @Column(columnDefinition = "json")
        val commandPacket: CommandPacket = CommandPacket.NULL,

        val crc32: Long = 0L
): UserDateAudit()