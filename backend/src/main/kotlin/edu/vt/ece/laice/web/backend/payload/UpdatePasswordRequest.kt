package edu.vt.ece.laice.web.backend.payload

/**
 * @author Cameron Earle
 * @version 8/8/2018
 *
 */
data class UpdatePasswordRequest(val oldPassword: String,
                                 val newPassword: String)