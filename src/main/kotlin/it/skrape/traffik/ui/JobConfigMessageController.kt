package it.skrape.traffik.ui

import it.skrape.traffik.ui.Job.Status
import it.skrape.traffik.ui.JobMessage.Action.CREATE
import it.skrape.traffik.ui.JobMessage.Action.DELETE
import org.springframework.messaging.handler.annotation.MessageMapping
import org.springframework.messaging.handler.annotation.Payload
import org.springframework.messaging.simp.SimpMessagingTemplate
import org.springframework.web.bind.annotation.*


@RestController
class JobConfigMessageController(val template: SimpMessagingTemplate) {

    val jobRepository = mutableListOf<Job>()

    @MessageMapping("/all")
    fun post(@Payload message: JobMessage): JobMessage {
        jobRepository.add(message.job)
        return JobMessage(CREATE, jobRepository.last())
    }

    @GetMapping("/add")
    fun add(
            @RequestParam displayName: String,
            @RequestParam url: String,
            @RequestParam status: Status
    ) {
        val message = JobMessage(CREATE, Job(displayName, url, status))
        jobRepository.add(message.job)
        template.convertAndSend("/topic/all", message)
    }

    @PostMapping("/remove")
    fun remove(@RequestBody job: Job) {
        jobRepository.remove(job)
        val message = JobMessage(DELETE, job)
        template.convertAndSend("/topic/all", message)

    }

    @GetMapping("/history")
    fun get(): List<Job> {
        return jobRepository
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

data class JobMessage(
        val type: Action,
        val job: Job
) {
    enum class Action {
        CREATE,
        UPDATE,
        DELETE
    }
}
