package edu.vt.ece.laice.web.backend.security

import edu.vt.ece.laice.web.backend.repository.UserRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.stereotype.Service
import javax.transaction.Transactional

@Service
class CustomUserDetailsService: UserDetailsService {
    @Autowired
    lateinit var userRepository: UserRepository

    @Transactional
    @Throws(UsernameNotFoundException::class)
    override fun loadUserByUsername(username: String?): UserDetails {
        val user = userRepository.findByEmail(username ?: "") ?: throw UsernameNotFoundException("User with email '$username' not found")
        return UserPrincipal.create(user)
    }

    @Transactional
    fun loadUserById(id: Long): UserDetails {
        val user = userRepository.findById(id).orElseThrow { UsernameNotFoundException("User with id '$id' not found") }
        return UserPrincipal.create(user)
    }
}