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
                    link {
                        href = "https://fonts.googleapis.com/css?family=Raleway"
                        rel = "stylesheet"
                    }
                    link(rel = "shortcut icon", href = "/logo-green.png")
                    link(rel = "stylesheet", href = "/dist/bundle.css")
                    style {
                        unsafe {
                            raw("""
                                html {
                                    font-family: 'Raleway', sans-serif;
                                    background-color: #292929;
                                    color: #bbb;
                                }
                            """.trimIndent())
                        }
                    }
                }

                body {
                    div {
                        id = "root"
                    }
                    script(src = "/dist/bundle.js") { }
                }
            }.serialize(true)
}
