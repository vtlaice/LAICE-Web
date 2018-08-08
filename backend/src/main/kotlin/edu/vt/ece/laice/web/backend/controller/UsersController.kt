package edu.vt.ece.laice.web.backend.controller

import edu.vt.ece.laice.web.backend.exception.ResourceNotFoundException
import edu.vt.ece.laice.web.backend.model.RoleName
import edu.vt.ece.laice.web.backend.payload.*
import edu.vt.ece.laice.web.backend.repository.UserRepository
import edu.vt.ece.laice.web.backend.security.CurrentUser
import edu.vt.ece.laice.web.backend.security.UserPrincipal
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.core.annotation.Order
import org.springframework.http.ResponseEntity
import org.springframework.security.access.annotation.Secured
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/users")
class UsersController {
    @Autowired
    lateinit var userRepository: UserRepository


    @GetMapping("/me")
    fun getCurrentUser(@CurrentUser currentUser: UserPrincipal): ResponseEntity<*> {
        val summary = UserSummaryResponse(
                currentUser.id,
                currentUser.email,
                currentUser.firstName,
                currentUser.lastName,
                currentUser.authorities.map { it.authority }
        )

        return ResponseEntity.ok(summary)
    }

    @PostMapping("/me/updateDetails")
    fun updateUserDetails(@CurrentUser currentUser: UserPrincipal, @RequestBody request: UpdateUserDetailsRequest): ResponseEntity<*> {
        val userObj = userRepository.findById(currentUser.id).orElseThrow { ResourceNotFoundException("User", "id", currentUser.id)}

        userObj.firstName = request.firstName
        userObj.lastName = request.lastName

        userRepository.save(userObj)

        return ResponseEntity.ok(ApiResponse(true, "User details updated successfully"))
    }

    @GetMapping("/isEmailAvailable")
    fun isEmailAvailable(@RequestParam email: String): ResponseEntity<*> {
        val available = !userRepository.existsByEmail(email)
        val response = EmailAvailabilityResponse(available)
        return ResponseEntity.ok(response)
    }

    @GetMapping("/all")
    @PreAuthorize("hasRole('MANAGE_USERS')")
    fun listAllUsers(): ResponseEntity<*> {
        val users = userRepository.findAll()
        //Map to UserSummaryResponse objects so we don't send passwords to the user
        val response = users.map { UserSummaryResponse(it.id, it.email, it.firstName, it.lastName, it.roles.map { it.name.name }) }
        return ResponseEntity.ok(response)
    }

    @GetMapping("/user/{id}")
    @PreAuthorize("hasRole('MANAGE_USERS')")
    fun getUser(@PathVariable id: Long): ResponseEntity<*> {
        val user = userRepository.findById(id).orElseThrow { ResourceNotFoundException("User", "id", id) }
        val response = UserSummaryResponse(user.id, user.email, user.firstName, user.lastName, user.roles.map { it.name.name })
        return ResponseEntity.ok(response)
    }
}