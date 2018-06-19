package edu.vt.ece.laice.web.backend.payload

import edu.vt.ece.laice.web.backend.model.RoleName

data class SignUpRequest(val email: String = "",
                         val password: String = "",
                         val firstName: String = "",
                         val lastName: String = "",
                         val roles: Set<RoleName> = setOf())