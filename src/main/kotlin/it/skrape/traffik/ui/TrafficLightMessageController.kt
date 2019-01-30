package it.skrape.traffik.ui

import it.skrape.traffik.domain.TrafficLight
import it.skrape.traffik.usb.UsbDevices
import org.springframework.messaging.simp.SimpMessagingTemplate
import org.springframework.scheduling.annotation.Scheduled
import org.springframework.stereotype.Controller

@Controller
class TrafficLightMessageController(val template: SimpMessagingTemplate) {

    @Scheduled(fixedDelay = 5000)
    fun sendMessage(msg: Map<String, String>) {
        val trafficLight: TrafficLight = UsbDevices()
        template.convertAndSend("/topic/trafficlight", trafficLight.isConnected())
    }
}
