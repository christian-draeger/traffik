package it.skrape.traffik.domain

import javax.usb.UsbDevice

interface TrafficLight {

    fun isConnected(): Boolean {
        return get() != null
    }

    fun action(color: Color, action: Action)

    fun get(): UsbDevice?

}

enum class Color {
    RED, YELLOW, GREEN
}

enum class Action {
    ON, OFF, BLINK
}
