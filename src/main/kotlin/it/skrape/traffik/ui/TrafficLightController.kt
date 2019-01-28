package it.skrape.traffik.ui

import it.skrape.traffik.domain.Action
import it.skrape.traffik.domain.Color
import it.skrape.traffik.domain.TrafficLight
import it.skrape.traffik.usb.UsbDevices
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/traffic-light")
class TrafficLightController {

    val trafficLight: TrafficLight = UsbDevices()

    @GetMapping("/available")
    fun isDeviceAvailable(): Boolean {
        return trafficLight.isConnected()
    }

    /**
     * example call http://localhost:8080/traffic-light/switch?color=GREEN&action=ON
     */
    @GetMapping("/switch")
    fun trafficLightAction(@RequestParam color: Color, @RequestParam action: Action) {
        trafficLight.action(color, action)
    }
}
