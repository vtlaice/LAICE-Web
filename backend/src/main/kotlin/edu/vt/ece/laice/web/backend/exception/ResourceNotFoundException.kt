package edu.vt.ece.laice.web.backend.exception

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.ResponseStatus

@ResponseStatus(HttpStatus.NOT_FOUND)
class ResourceNotFoundException(val resourceName: String, val fieldName: String, val fieldValue: Any):
        RuntimeException("$resourceName not found with $fieldName : $fieldValue")