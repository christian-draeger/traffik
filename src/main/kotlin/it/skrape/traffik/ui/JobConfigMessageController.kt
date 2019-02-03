package it.skrape.traffik.ui

import org.springframework.messaging.handler.annotation.MessageMapping
import org.springframework.messaging.handler.annotation.Payload
import org.springframework.messaging.simp.SimpMessagingTemplate
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController


@RestController
class JobConfigMessageController(val template: SimpMessagingTemplate) {

    val jobRepository = mutableListOf<JobMessage>()

    @MessageMapping("/all")
    fun post(@Payload message: JobMessage): JobMessage {
        jobRepository.add(message)
        return message
    }

    @GetMapping("/add")
    fun add(
            @RequestParam displayName: String,
            @RequestParam url: String,
            @RequestParam status: JobMessage.Status
    ) {
        val message = JobMessage(displayName, url, status)
        jobRepository.add(message)
        template.convertAndSend("/topic/all", message)
    }

    @GetMapping("/history")
    fun get(): List<JobMessage> {
        return jobRepository
    }
}

data class JobMessage(
        val displayName: String,
        val url: String,
        val status: Status = Status.NOT_AVAILABLE
) {
    enum class Status {
        SUCCESS,
        ERROR,
        BUILDING,
        NOT_AVAILABLE
    }
}
