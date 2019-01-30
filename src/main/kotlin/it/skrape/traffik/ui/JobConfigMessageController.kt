package it.skrape.traffik.ui

import org.springframework.messaging.handler.annotation.MessageMapping
import org.springframework.messaging.handler.annotation.Payload
import org.springframework.messaging.simp.SimpMessagingTemplate
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController


@RestController
class JobConfigMessageController(val template: SimpMessagingTemplate) {

    val messageRepository = mutableListOf(mapOf("status" to "OK"), mapOf("status" to "ERROR"))

    @MessageMapping("/all")
    fun post(@Payload message: Map<String, String>): Map<String, String> {
        messageRepository.add(message)
        return message
    }

    @GetMapping("/add")
    fun add(@RequestParam status: String) {
        val message = mapOf("status" to status)
        messageRepository.add(message)
        template.convertAndSend("/topic/all", message)
    }

    @GetMapping("/history")
    fun get(): List<Map<String, String>> {
        return messageRepository
    }
}
