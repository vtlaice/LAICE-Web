package edu.vt.ece.laice.web.backend.security

import io.jsonwebtoken.*
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Value
import org.springframework.security.core.Authentication
import org.springframework.stereotype.Component
import java.util.*

@Component
class JwtTokenProvider {
    companion object {
        private val logger = LoggerFactory.getLogger(JwtTokenProvider::class.java)
    }

    @Value("\${app.jwtSecret}")
    private lateinit var jwtSecret: String

    @Value("\${app.jwtExpirationInMs}")
    private var jwtExpirationInMs = 0

    fun generateToken(authentication: Authentication) : String{
        val principal = authentication.principal as UserPrincipal
        val now = Date()
        val expiry = Date(now.time + jwtExpirationInMs)

        return Jwts.builder()
                .setSubject(principal.id.toString())
                .setIssuedAt(now)
                .setExpiration(expiry)
                .signWith(SignatureAlgorithm.HS512, jwtSecret)
                .compact()
    }

    fun getUserIdFromJWT(token: String): Long {
        val claims = Jwts.parser()
                .setSigningKey(jwtSecret)
                .parseClaimsJws(token)
                .body

        return claims.subject.toLong()
    }

    fun validateToken(token: String): Boolean {
        try {
            Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token)
            return true
        } catch (e: SignatureException) {
            logger.error("Invalid JWT signature")
        } catch (e: MalformedJwtException) {
            logger.error("Invalid JWT token")
        } catch (e: ExpiredJwtException) {
            logger.error("Expired JWT token")
        } catch (e: UnsupportedJwtException) {
            logger.error("Unsupported JWT token")
        } catch (e: IllegalArgumentException) {
            logger.error("JWT claims string is empty.")
        }
        return false
    }

}