package edu.vt.ece.laice.web.backend.model

import edu.vt.ece.laice.web.backend.model.audit.DateAudit
import org.hibernate.annotations.NaturalId
import javax.persistence.*
import javax.validation.constraints.Email
import javax.validation.constraints.NotBlank

@Entity
@Table(
        name = "users",
        uniqueConstraints = [UniqueConstraint(columnNames = ["email"])]
)
data class User(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        var id: Long = 0L,

        @NaturalId
        @NotBlank
        @Email
        var email: String = "",

        @NotBlank
        var password: String = "",

        @NotBlank
        var firstName: String = "",

        @NotBlank
        var lastName: String = "",

        @ManyToMany(fetch = FetchType.LAZY)
        @JoinTable(
                name = "user_roles",
                joinColumns = [JoinColumn(name = "user_id")],
                inverseJoinColumns = [JoinColumn(name = "role_id")]
        )
        var roles: Set<Role> = hashSetOf()
): DateAudit()