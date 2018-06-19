package edu.vt.ece.laice.web.backend.exception

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.ResponseStatus

@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
class AppException(message: String, cause: Throwable? = null): RuntimeException(message, cause)