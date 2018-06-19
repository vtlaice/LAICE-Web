package edu.vt.ece.laice.web.backend.repository

import edu.vt.ece.laice.web.backend.model.Role
import edu.vt.ece.laice.web.backend.model.RoleName
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface RoleRepository: JpaRepository<Role, Long> {
    fun findByName(roleName: RoleName): Role?
}