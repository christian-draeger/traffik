package it.skrape.traffik.usb

import it.skrape.traffik.domain.Action
import it.skrape.traffik.domain.Color
import it.skrape.traffik.domain.TrafficLight
import mu.KotlinLogging
import net.eraga.rxusb.UsbDevice
import net.eraga.rxusb.UsbService
import net.eraga.rxusb.exceptions.UsbEntityNotFound
import net.eraga.rxusb.nio.BulkWritableChannel
import java.nio.ByteBuffer

class AmpelDevice : TrafficLight {

    private val logger = KotlinLogging.logger {}

    private val usbManager = UsbService.instance

    override fun action(light: Pair<Color, Action>) {
        if (isConnected()) {
            logger.info { "try to switch traffic light ${light.first} ${light.second}" }

            when (light) {
                Pair(Color.RED, Action.ON) -> send()
                Pair(Color.RED, Action.BLINK) -> println("turn red light blink")
                Pair(Color.RED, Action.OFF) -> println("turn red light off")
                Pair(Color.YELLOW, Action.ON) -> println("turn yellow light on")
                Pair(Color.YELLOW, Action.BLINK) -> println("turn yellow light blink")
                Pair(Color.YELLOW, Action.OFF) -> println("turn yellow light off")
                Pair(Color.GREEN, Action.ON) -> println("turn green light on")
                Pair(Color.GREEN, Action.BLINK) -> println("turn green light blink")
                Pair(Color.GREEN, Action.OFF) -> println("turn green light off")
            }
        } else {
            logger.warn { "can NOT switch traffic light because it's not connected!" }
        }

    }

    fun send() {
        val device = get()
        val deviceConnection = usbManager.openDevice(device)
        val interfaceConnection = deviceConnection.claimInterface(device.getInterface(0))
        val bulkOutEndpoint = interfaceConnection.open(
                interfaceConnection.usbInterface.getEndpoint(1)
        ) as BulkWritableChannel

        val text = "Hello World!"

        val textByteBuffer = ByteBuffer.allocateDirect(text.length)
        textByteBuffer.put(text.toByteArray())

        bulkOutEndpoint.send(textByteBuffer)
                .subscribe ({
                    logger.info("Data successfully sent")
                },{
                    logger.error("Error: {}", it)
                })
    }

    override fun isConnected(): Boolean {
        try {
            get()
        } catch (e: UsbEntityNotFound) {
            return false
        }
        return true
    }

    override fun get(): UsbDevice {
        return usbManager.findDevice(0x0d50, 0x0008)
    }
}
