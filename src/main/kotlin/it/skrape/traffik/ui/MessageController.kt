package it.skrape.traffik.ui

import org.springframework.messaging.handler.annotation.MessageMapping
import org.springframework.messaging.handler.annotation.Payload
import org.springframework.messaging.handler.annotation.SendTo
import org.springframework.messaging.simp.SimpMessagingTemplate
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController


@RestController
class MessageController(val template: SimpMessagingTemplate) {

    val messageRepository = mutableListOf(mapOf("status" to "OK"), mapOf("status" to "ERROR"))

    @MessageMapping("/all")
    @SendTo("/topic/all")
    fun post(@Payload message: Map<String, String>): List<Map<String, String>> {
        messageRepository.add(message)
        return messageRepository
    }

    @GetMapping("/history")
    fun get(): List<Map<String, String>> {
        return messageRepository
    }

    @GetMapping("/add")
    fun add(@RequestParam status: String) {
        messageRepository.add(mapOf("status" to status))
        template.convertAndSend("/topic/all", messageRepository)
    }

    fun sendMessage(msg: Map<String, String>) {
        messageRepository.add(msg)
        template.convertAndSend("/topic/all", messageRepository)
    }
}
