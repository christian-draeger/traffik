package it.skrape.traffik.usb

import it.skrape.traffik.domain.TrafficLight
import org.springframework.messaging.simp.SimpMessagingTemplate
import org.springframework.scheduling.annotation.Scheduled
import org.springframework.stereotype.Controller

@Controller
class TrafficLightMessageController(val template: SimpMessagingTemplate) {

    @Scheduled(fixedDelay = 5000)
    fun notifyUi() {
        val trafficLight: TrafficLight = AmpelDevice()
        var isConnected = false
        if (trafficLight.isConnected()) {
            isConnected = true
        }
        template.convertAndSend("/topic/trafficlight", isConnected)
    }
}
