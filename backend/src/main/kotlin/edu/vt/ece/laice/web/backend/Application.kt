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


@Component
class TestComponent {
    @Autowired
    lateinit var packetRepository: PacketRepository

    @PostConstruct
    fun addTestPacket() {
        println(Year.of(2018).atMonth(Month.JANUARY).atEndOfMonth().atTime(23, 59, 59, 999_999_999).toInstant(ZoneOffset.UTC))

        /*
        val packets = packetRepository.findAllByStartTimeLessThanEqualAndEndTimeGreaterThanEqual(Instant.ofEpochSecond(9000), Instant.ofEpochSecond(100))
        packets.forEach {
            println(it)
        }
        */
        /*
        val packet = Packet(
                startTime = Instant.now(),
                endTime = Instant.now().plus(3, ChronoUnit.DAYS),
                schedulePacket = SchedulePacket(
                        LIIBMode.NORMAL_MODE,
                        true,
                        true,
                        false,
                        RG2ModeRPA.RETARDING,
                        SweepModeRPA.LINEAR_SWEEP,
                        50,
                        FilamentSelectLINAS.FILAMENT_1,
                        CollectorGainStateLINAS.SWITCH_GAIN_STATE,
                        0,
                        EmissionModeSNeuPI.NULL
                )
        )

        packetRepository.save(packet)
        */
    }
}