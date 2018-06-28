package edu.vt.ece.laice.web.backend.packet

interface DutyCycle {
    val minutesOn: Int
    val minutesOff: Int

    fun secondsOn() = minutesOn * 60L
    fun secondsOff() = secondsOn() + (minutesOff * 60L)

    fun totalSeconds() = secondsOff()
}


enum class DutyCycleSNeuPI(override val minutesOn: Int, override val minutesOff: Int): DutyCycle {
    PERCENT_10(18, 162),
    PERCENT_20(36, 144),
    PERCENT_50(90, 90),
    PERCENT_100(180, 0);

    companion object {
        val CYCLE_TOTAL_SECONDS = PERCENT_100.secondsOn()

        fun fromValue(value: Int): DutyCycleSNeuPI {
            return when (value) {
                10 -> PERCENT_10
                20 -> PERCENT_20
                50 -> PERCENT_50
                else -> PERCENT_100
            }
        }
    }
}

enum class DutyCycleLINAS(override val minutesOn: Int, override val minutesOff: Int): DutyCycle {
    PERCENT_10(3, 27),
    PERCENT_20(6, 24),
    PERCENT_50(15, 15),
    PERCENT_100(30, 0);

    companion object {
        fun fromValue(value: Int): DutyCycleLINAS {
            return when (value) {
                10 -> PERCENT_10
                20 -> PERCENT_20
                50 -> PERCENT_50
                else -> PERCENT_100
            }
        }
    }
}