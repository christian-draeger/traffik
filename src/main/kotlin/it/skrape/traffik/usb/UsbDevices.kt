package it.skrape.traffik.usb

import it.skrape.traffik.ui.Action
import it.skrape.traffik.ui.Color
import mu.KotlinLogging
import javax.usb.UsbDevice
import javax.usb.UsbHostManager
import javax.usb.UsbHub

object UsbDevices {

    private val logger = KotlinLogging.logger {}

    fun getAmpel(): UsbDevice? {
        val availableDevices = getAvailableDevices()
        return availableDevices.find {
            it.usbDeviceDescriptor.idVendor() == 0x0d50.toShort() && it.usbDeviceDescriptor.iProduct() == 0x0008.toByte()
        }
    }

    fun ampelAction(color: Color, action: Action) {

        logger.info { "try to communicate with traffic light - action: $color $action" }

        val device = getAmpel()

        if (device != null) {
            val usbInterface = device.activeUsbConfiguration.getUsbInterface(0)
            usbInterface.claim { true }

            val endpoint = usbInterface.getUsbEndpoint(0x81.toByte())
            val pipe = endpoint.usbPipe
            pipe.open()

            try {
                pipe.syncSubmit(byteArrayOf(0x28.toByte()))
            } finally {
                pipe.close()
            }
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

            attachedUsbDevices.forEach {
                availableDevices.add(it)
            }
        }
        return availableDevices
    }
}