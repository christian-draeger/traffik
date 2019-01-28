package it.skrape.traffik.ui

import it.skrape.traffik.usb.UsbDevices
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
class TrafficLightController {

    @GetMapping("/available")
    fun isDeviceAvailable(): Boolean {
        return UsbDevices.getAmpel() != null
    }

    /**
     * example call http://localhost:8080/light?color=GREEN&action=ON
     */
    @GetMapping("/light")
    fun trafficLightAction(@RequestParam color: Color, @RequestParam action: Action) {
        UsbDevices.ampelAction(color, action)
    }
}

enum class Color {
    RED, YELLOW, GREEN
}

enum class Action {
    ON, OFF, BLINK
}
