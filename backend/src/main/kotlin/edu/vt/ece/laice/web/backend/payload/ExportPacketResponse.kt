package edu.vt.ece.laice.web.backend.payload

/**
 * @author Cameron Earle
 * @version 7/24/2018
 *
 */
data class ExportPacketResponse(val csv: String,
                                val filename: String)