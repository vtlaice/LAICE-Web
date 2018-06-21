package edu.vt.ece.laice.web.backend.payload

data class UserSummaryResponse(val id: Long,
                               val email: String,
                               val firstName: String,
                               val lastName: String,
                               val roles: List<String>)