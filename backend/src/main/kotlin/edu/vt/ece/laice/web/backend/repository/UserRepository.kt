package edu.vt.ece.laice.web.backend.repository

import edu.vt.ece.laice.web.backend.model.User
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface UserRepository: JpaRepository<User, Long> {
    fun findByEmail(email: String): User?
    fun existsByEmail(email: String): Boolean

    fun findByIdIn(userIds: List<Long>): List<User>
}