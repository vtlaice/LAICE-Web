package edu.vt.ece.laice.web.backend.packet

class CommandHolder<out T>(val first: T, val second: T? = null) {
    fun isDouble(): Boolean {
        return second != null
    }
}