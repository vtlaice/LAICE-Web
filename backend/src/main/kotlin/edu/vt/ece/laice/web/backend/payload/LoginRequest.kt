package edu.vt.ece.laice.web.backend.payload

data class LoginRequest(val email: String = "",
                        val password: String = "")