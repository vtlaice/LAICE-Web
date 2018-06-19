package edu.vt.ece.laice.web.backend.model

import org.hibernate.annotations.NaturalId
import javax.persistence.*

@Entity
@Table(name = "roles")
data class Role(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        var id: Long = 0L,

        @Enumerated(EnumType.STRING)
        @NaturalId
        var name: RoleName = RoleName.NONE
)