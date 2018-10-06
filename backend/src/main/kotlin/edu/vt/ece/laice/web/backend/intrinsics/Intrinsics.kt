package edu.vt.ece.laice.web.backend.intrinsics

import edu.vt.ece.laice.web.backend.packet.LIIBMode
import edu.vt.ece.laice.web.backend.packet.SchedulePacket
import java.time.Instant

/**
 * @author Cameron Earle
 * @version 7/23/2018
 *
 */
object Intrinsics {
    /**
     * Verifies the following conditions on a schedule packet:
     *
     * 1. The LIIB Mode is defined
     * 2. If an instrument is marked as enabled, all of the options are defined
     */
    fun verifySchedulePacket(packet: SchedulePacket): Boolean {
        //Ensure liibmode is defined
        if (packet.liibMode == null) return false

        //Ensure that if an instrument is enabled (and the LIIB is in normal mode), all of the parameters are populated
        if (packet.liibMode == LIIBMode.NORMAL_MODE) {
            if (packet.rpa) {
                if (packet.rg2ModeRpa == null) return false
                if (packet.sweepModeRpa == null) return false
            }

            if (packet.sneupi) {
                if (packet.dutyCycleSneupi == null) return false
                if (packet.emissionModeSneupi == null) return false
            }

            if (packet.linas) {
                if (packet.collectorGainStateLinas == null) return false
                if (packet.dutyCycleLinas == null) return false
                if (packet.filamentSelectLinas == null) return false
            }
        }

        return true
    }

    /**
     * Verifies the following conditions in a time range
     *
     * 1. The end time is after than the start time
     */
    fun verifyTimeRange(startTime: Instant, endTime: Instant): Boolean {
        if (!endTime.isAfter(startTime)) return false

        return true
    }

    /**
     * Verifies the following conditions about the start time of the packet
     *
     * 1. The start time is not after the current time
     */
    fun verifyStartTime(startTime: Instant): Boolean {
        val now = Instant.now()
        if (!startTime.isAfter(now)) return false

        return true
    }
}