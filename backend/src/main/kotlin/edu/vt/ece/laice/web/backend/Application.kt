package edu.vt.ece.laice.web.backend

import edu.vt.ece.laice.web.backend.model.Packet
import edu.vt.ece.laice.web.backend.packet.*
import edu.vt.ece.laice.web.backend.repository.PacketRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.autoconfigure.domain.EntityScan
import org.springframework.boot.runApplication
import org.springframework.data.jpa.convert.threeten.Jsr310JpaConverters
import org.springframework.stereotype.Component
import java.time.*
import java.time.temporal.ChronoUnit
import java.util.*
import javax.annotation.PostConstruct

@SpringBootApplication
@EntityScan(basePackageClasses = [Application::class, Jsr310JpaConverters::class])
class Application {
    @PostConstruct
    fun init() {
        TimeZone.setDefault(TimeZone.getTimeZone("UTC"))
    }
}

fun main(args: Array<String>) {
    runApplication<Application>(*args)
}