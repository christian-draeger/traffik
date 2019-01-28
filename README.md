[![Build Status](https://travis-ci.org/christian-draeger/traffik.svg?branch=master)](https://travis-ci.org/christian-draeger/traffik)

Traffik
=======

A Web-Interface to control [Cleware USB Ampel](http://www.cleware-shop.de/epages/63698188.sf/de_DE/?ObjectPath=/Shops/63698188/Products/61/SubProducts/61-1)
traffic light USB device.

### Application
This Spring-Boot based application is written in Kotlin and uses the 
[usb4java](http://usb4java.org/quickstart/javax-usb.html) high-level API that implements 
the [javax-usb (JSR-80)](http://javax-usb.sourceforge.net/) standard to communicate
with the USB traffic light device.

#### Development

run the Application (default on port 8080):

	./mvnw spring-boot:run
