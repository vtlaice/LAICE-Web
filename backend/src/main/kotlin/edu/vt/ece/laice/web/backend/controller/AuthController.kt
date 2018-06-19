package edu.vt.ece.laice.web.backend.controller

import edu.vt.ece.laice.web.backend.exception.AppException
import edu.vt.ece.laice.web.backend.model.User
import edu.vt.ece.laice.web.backend.payload.ApiResponse
import edu.vt.ece.laice.web.backend.payload.JwtAuthenticationResponse
import edu.vt.ece.laice.web.backend.payload.LoginRequest
import edu.vt.ece.laice.web.backend.payload.SignUpRequest
import edu.vt.ece.laice.web.backend.repository.UserRepository
import edu.vt.ece.laice.web.backend.repository.RoleRepository
import edu.vt.ece.laice.web.backend.security.JwtTokenProvider
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.servlet.support.ServletUriComponentsBuilder
import javax.validation.Valid

@RestController
@RequestMapping("/api/auth")
class AuthController {
    @Autowired
    lateinit var authenticationManager: AuthenticationManager

    @Autowired
    lateinit var userRepository: UserRepository

    @Autowired
    lateinit var roleRepository: RoleRepository

    @Autowired
    lateinit var passwordEncoder: PasswordEncoder

    @Autowired
    lateinit var tokenProvider: JwtTokenProvider

    @PostMapping("/login")
    fun authenticateUser(@Valid @RequestBody loginRequest: LoginRequest): ResponseEntity<*> {
        val authentication = authenticationManager.authenticate(
                UsernamePasswordAuthenticationToken(
                        loginRequest.email,
                        loginRequest.password
                )
        )

        SecurityContextHolder.getContext().authentication = authentication
        val jwt = tokenProvider.generateToken(authentication)
        return ResponseEntity.ok(JwtAuthenticationResponse(jwt))
    }

    @PostMapping("/signup")
    fun registerUser(@Valid @RequestBody signUpRequest: SignUpRequest): ResponseEntity<*> {
        if (userRepository.existsByEmail(signUpRequest.email)) {
            return ResponseEntity.badRequest().body(ApiResponse(false, "Email is already taken!"))
        }

        val roles = signUpRequest.roles.map { roleRepository.findByName(it) ?: throw AppException("Role '$it' is not in role table!") }.toSet()

        val user = User(
                email = signUpRequest.email,
                password = passwordEncoder.encode(signUpRequest.password),
                firstName = signUpRequest.firstName,
                lastName = signUpRequest.lastName,
                roles = roles
        )


        val result = userRepository.save(user)

        val location = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/api/users/{email}")
                .buildAndExpand(result.email).toUri()

        return ResponseEntity.created(location).body(ApiResponse(true, "Created user '${result.email}'"))
    }
}