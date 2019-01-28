package it.skrape.traffik.ui

import kotlinx.html.*
import kotlinx.html.dom.createHTMLDocument
import kotlinx.html.dom.serialize
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class StaticTemplateController {

    @GetMapping("/")
    fun isDeviceAvailable(): String {
        return renderInitialMarkup()
    }

    private fun renderInitialMarkup(): String =
            createHTMLDocument().html {
                head {
                    title { +"Traffik" }
                    meta(charset = "utf-8")
                }

                body {
                    div {
                        id = "root"
                    }
                    script(src = "/dist/bundle.js") { }
                }
            }.serialize(true)
}
