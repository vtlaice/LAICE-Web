package edu.vt.ece.laice.web.backend.payload

data class JwtAuthenticationResponse(val accessToken: String,
                                     val tokenType: String = "Bearer")