package it.skrape.traffik

import it.skrape.elements
import it.skrape.expect
import it.skrape.matchers.toBe
import it.skrape.skrape
import org.assertj.core.api.KotlinAssertions.assertThat
import org.junit.Test
import org.junit.runner.RunWith
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.web.server.LocalServerPort
import org.springframework.test.context.junit4.SpringRunner

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@RunWith(SpringRunner::class)
class StaticTemplateControllerIT {

    @LocalServerPort
    private var port: Int = 0

    @Test
    fun `static markup is rendered properly`() {

        skrape {
            url = "http://localhost:$port"

            expect {

                assertThat(statusCode).isEqualTo(200)
                assertThat(contentType).isEqualTo("text/html;charset=UTF-8")

                document.title() toBe "Traffik"

                elements("body div#root") {
                    assertThat(size).isEqualTo(1)
                }
            }
        }
    }
}