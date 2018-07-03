package edu.vt.ece.laice.web.backend.packet

import edu.vt.ece.laice.web.backend.model.Packet

object CSVGenerator {
    /**
     * Creates a CSV line from the given TimePacketPair in the format:
     * "command1,command2,duration"
     * Where commands are in CRC32 hashes, and duration is in seconds
     */
    private fun createCSVLine(pair: TimePacketPair): String {
        return "${pair.packet.first.crc32()},${pair.packet.second.crc32()},${pair.getDuration()}"
    }

    fun createCSVLines(packet: Packet): List<String> {
        val pairs = PacketGenerator.createCommandPackets(packet)
        return pairs.map { createCSVLine(it) }
    }
}