package edu.vt.ece.laice.web.backend.model.audit

import com.fasterxml.jackson.annotation.JsonIgnoreProperties
import org.springframework.data.annotation.CreatedBy
import org.springframework.data.annotation.LastModifiedBy
import javax.persistence.MappedSuperclass

@MappedSuperclass
@JsonIgnoreProperties(
        value = ["createdBy", "updatedBy"],
        allowGetters = true
)
abstract class UserDateAudit: DateAudit() {
    @CreatedBy
    var createdBy: Long = 0L

    @LastModifiedBy
    var updatedBy: Long = 0L
}