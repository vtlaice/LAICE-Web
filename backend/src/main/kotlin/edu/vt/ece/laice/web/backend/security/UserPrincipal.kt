package edu.vt.ece.laice.web.backend.security

import edu.vt.ece.laice.web.backend.model.User
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.userdetails.UserDetails
import java.util.*

class UserPrincipal(
        val id: Long,
        val email: String,
        private val mPassword: String,
        val firstName: String,
        val lastName: String,
        private val mAuthorities: Collection<GrantedAuthority>
): UserDetails {
    companion object {
        fun create(user: User): UserPrincipal {
            val authorities = user.roles.map { SimpleGrantedAuthority(it.name.name) }
            return UserPrincipal(
                    user.id,
                    user.email,
                    user.password,
                    user.firstName,
                    user.lastName,
                    authorities
            )
        }
    }

    override fun getUsername() = email
    override fun getPassword() = mPassword
    override fun getAuthorities() = mAuthorities

    override fun isAccountNonExpired() = true
    override fun isAccountNonLocked() = true
    override fun isCredentialsNonExpired() = true
    override fun isEnabled() = true

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other == null || javaClass != other.javaClass) return false
        val otherPrincipal = other as UserPrincipal
        return Objects.equals(id, otherPrincipal.id)
    }

    override fun hashCode() = Objects.hash(id)
}