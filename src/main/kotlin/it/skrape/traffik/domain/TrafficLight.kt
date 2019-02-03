package it.skrape.traffik.domain

interface TrafficLight {

    fun isConnected(): Boolean

    fun action(light: Pair<Color, Action>)

    fun get(): net.eraga.rxusb.UsbDevice

}

enum class Color {
    RED, YELLOW, GREEN
}

enum class Action {
    ON, OFF, BLINK
}
