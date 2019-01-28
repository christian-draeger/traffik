package it.skrape.traffik

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class TraffikApplication

fun main(args: Array<String>) {
    runApplication<TraffikApplication>(*args)
}

