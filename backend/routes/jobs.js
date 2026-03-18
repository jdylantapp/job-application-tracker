import express, { request } from 'express'
import Job from '../models/JobApplication.js'

const jobRouter = express.Router()

//GET ALL JOBS
jobRouter.get('/', async(request, response) => {
    try {
        const jobs = await Job.find({}).sort({createdAt: -1})
        response.json(jobs)
    }
    catch(error) {
        response.status(500).json({error: 'Failed to fetch jobs'})
    } 
})

//ADD NEW JOB
jobRouter.post('/', async(request, response) => {
    try {
        const job = new Job(request.body)
        const savedJob = await job.save()
        response.status(201).json(savedJob)
    }
    catch (error) {
        response.status(400).json({error: 'Failed to create job'})
    }
})

//UPDATE A JOB
jobRouter.put('/:id', async(request, response) => {
    try {
        const updatedJob = await Job.findByIdAndUpdate(
            request.params.id,
            request.body,
            {new: true, runValidators: true}
        )
        if (!updatedJob) {
            return response.status(404).json({error: 'Job not found'})
        }

        response.json(updatedJob)
    }
    catch (error) {
        response.status(400).json({error: 'Failed to update job'})
    }
})

//DELETE A JOB
jobRouter.delete('/:id', async(request, response) => {
    try {
        const deletedJob = await Job.findByIdAndDelete(request.params.id)

        if (!deletedJob) {
            return response.status(404).json({error: 'Job not found'})
        }

        response.json({message: 'Job successfully deleted'})
    }
    catch (error) {
        response.status(500).json({error: 'Failed to delete job'})
    }
})


export default jobRouter