package it.skrape.traffik.ui

import it.skrape.traffik.domain.BuildJobStatus
import it.skrape.traffik.domain.Inquiry
import org.springframework.messaging.handler.annotation.MessageMapping
import org.springframework.messaging.handler.annotation.SendTo
import org.springframework.stereotype.Controller



@Controller
class BuildJobStatusController {

    @MessageMapping("/inquiry")
    @SendTo("/topic/buildJobStatus")
    fun greeting(message: Inquiry): BuildJobStatus {
        return BuildJobStatus(listOf("OK", "OK", "ERROR"))
    }
}
