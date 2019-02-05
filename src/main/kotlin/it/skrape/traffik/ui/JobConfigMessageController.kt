package it.skrape.traffik.ui

import it.skrape.traffik.ui.JobMessage.Action
import it.skrape.traffik.ui.JobMessage.Action.*
import org.springframework.messaging.handler.annotation.MessageMapping
import org.springframework.messaging.handler.annotation.Payload
import org.springframework.messaging.simp.SimpMessagingTemplate
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController


@RestController
class JobConfigMessageController(val template: SimpMessagingTemplate) {

    val jobRepository = mutableListOf<Job>()

    @MessageMapping("/all")
    fun post(@Payload message: JobMessage): JobMessage {
        jobRepository.add(message.job)
        return JobMessage(CREATE, jobRepository.last())
    }

    @PostMapping("/remove")
    fun remove(@RequestBody job: Job) {
        jobRepository.remove(job)
        val message = JobMessage(DELETE, job)
        template.convertAndSend("/topic/all", message)
    }

    @GetMapping("/send-bulk")
    fun sendBulk() {
        template.convertAndSend("/topic/all", BulkMessage(jobs = jobRepository))
    }
}

data class Job(
        val displayName: String,
        val url: String,
        val status: Status = Status.NOT_AVAILABLE
) {
    enum class Status {
        SUCCESS,
        ERROR,
        BUILDING,
        NOT_AVAILABLE
    }
}

data class BulkMessage(
        val type: Action = BULK,
        val jobs: List<Job>
)

data class JobMessage(
        val type: Action,
        val job: Job
) {
    enum class Action {
        CREATE,
        UPDATE,
        DELETE,
        BULK
    }
}
