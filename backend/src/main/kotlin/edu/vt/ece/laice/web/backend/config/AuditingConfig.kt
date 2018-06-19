package edu.vt.ece.laice.web.backend.config

import edu.vt.ece.laice.web.backend.security.UserPrincipal
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.data.domain.AuditorAware
import org.springframework.data.jpa.repository.config.EnableJpaAuditing
import org.springframework.security.authentication.AnonymousAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder
import java.util.*

@Configuration
@EnableJpaAuditing
class AuditingConfig {
    @Bean
    fun auditorProvider(): AuditorAware<Long> {
        return AuditorAware<Long> {
            val authentication = SecurityContextHolder.getContext().authentication

            if (authentication == null || !authentication.isAuthenticated || authentication is AnonymousAuthenticationToken) {
                Optional.empty<Long>() //return
            }

            val userPrincipal = authentication.principal as UserPrincipal
            Optional.ofNullable(userPrincipal.id) //return
        }
    }
}