package it.skrape.traffik.usb

import it.skrape.traffik.domain.Action
import it.skrape.traffik.domain.Color
import it.skrape.traffik.domain.TrafficLight
import mu.KotlinLogging
import javax.usb.UsbDevice
import javax.usb.UsbEndpoint
import javax.usb.UsbHostManager
import javax.usb.UsbHub

class UsbDevices : TrafficLight {

    private val logger = KotlinLogging.logger {}

    override fun action(light: Pair<Color, Action>) {

        logger.info { "try to switch traffic light ${light.first} ${light.second}" }

        when (light) {
            Pair(Color.RED, Action.ON) -> redLightOn()
            Pair(Color.RED, Action.BLINK) -> println("turn red light blink")
            Pair(Color.RED, Action.OFF) -> println("turn red light off")
            Pair(Color.YELLOW, Action.ON) -> println("turn yellow light on")
            Pair(Color.YELLOW, Action.BLINK) -> println("turn yellow light blink")
            Pair(Color.YELLOW, Action.OFF) -> println("turn yellow light off")
            Pair(Color.GREEN, Action.ON) -> println("turn green light on")
            Pair(Color.GREEN, Action.BLINK) -> println("turn green light blink")
            Pair(Color.GREEN, Action.OFF) -> println("turn green light off")
        }
    }

    private fun redLightOn() {
        val device = get()

        if (device != null) {
            val usbInterface = device.activeUsbConfiguration.getUsbInterface(0)
            usbInterface.claim { true }

            val usbEndpoints = usbInterface.usbEndpoints
            val get0:UsbEndpoint = usbEndpoints.get(0) as UsbEndpoint
            val get1:UsbEndpoint = usbEndpoints.get(1) as UsbEndpoint
            println(get0.usbEndpointDescriptor)
            println(get1.usbEndpointDescriptor)
            usbEndpoints.forEach{
                println(it.toString())
            }

            val endpoint = usbInterface.getUsbEndpoint(0x81.toByte())
            val pipe = endpoint.usbPipe
            pipe.open()
            val createUsbIrp = pipe.createUsbIrp()
            createUsbIrp.setData(byteArrayOf(0x01), 0, 2)
            createUsbIrp.complete()

            try {
                pipe.syncSubmit(createUsbIrp)
            } finally {
                pipe.close()
            }
        }
    }

    override fun get(): UsbDevice? {
        val availableDevices = getAvailableDevices()
        return availableDevices.find {
            it.usbDeviceDescriptor.idVendor() == 0x0d50.toShort() && it.usbDeviceDescriptor.idProduct() == 0x0008.toShort()
        }
    }

    private fun getAvailableDevices(): MutableList<UsbDevice> {
        // Get the USB services and dump information about them
        val services = UsbHostManager.getUsbServices()
        return collectAllAvailableUsbDevices(services.rootUsbHub)
    }

    private fun collectAllAvailableUsbDevices(device: UsbDevice): MutableList<UsbDevice> {
        val availableDevices = mutableListOf<UsbDevice>()

        try {
            availableDevices.add(device)
        } catch (e: Exception) {
            // On Linux this can fail because user has no write permission
            // on the USB device file. On Windows it can fail because
            // no libusb device driver is installed for the device
            logger.error { "Ignoring problematic device: $e" }
        }

        // When device is a hub then process all child devices
        if (device.isUsbHub) {
            val hub = device as UsbHub
            val attachedUsbDevices = hub.attachedUsbDevices as List<UsbDevice>

            attachedUsbDevices.forEach { usbDevice ->
                if (usbDevice.isUsbHub) {
                    val hub1 = usbDevice as UsbHub
                    val attachedUsbDevices1 = hub1.attachedUsbDevices as List<UsbDevice>
                    attachedUsbDevices1.forEach {
                        availableDevices.add(it)
                    }
                }
                availableDevices.add(usbDevice)
            }
        }
        return availableDevices
    }
}