import express, { request } from 'express'
import Job from '../models/JobApplication.js'
import userAuth from '../middleware/userAuth.js'

const jobRouter = express.Router()

//GET ALL JOBS
jobRouter.get('/', userAuth, async(request, response) => {
    try {
        const jobs = await Job.find({userId: request.user.uid}).sort({dateApplied: -1})
        response.json(jobs)
    }
    catch(error) {
        response.status(500).json({error: 'Failed to fetch jobs'})
    } 
})

//ADD NEW JOB
jobRouter.post('/', userAuth, async(request, response) => {
    try {
        const job = new Job({
            ...request.body,
            userId: request.user.uid
        })
        const savedJob = await job.save()
        response.status(201).json(savedJob)
    }
    catch (error) {
        response.status(400).json({error: 'Failed to create job'})
    }
})

//UPDATE A JOB
jobRouter.put('/:id', userAuth, async(request, response) => {
    try {
        const updatedJob = await Job.findByIdAndUpdate(
            {
                _id: request.params.id,
                userId: request.user.uid
            },
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
jobRouter.delete('/:id', userAuth, async(request, response) => {
    try {
        const deletedJob = await Job.deleteOne({
            _id: request.params.id,
            userId: request.user.uid
        })

        if (deletedJob.deletedCount !== 1) {
            return response.status(404).json({error: 'Job not found'})
        }

        response.json({message: 'Job successfully deleted'})
    }
    catch (error) {
        response.status(500).json({error: 'Failed to delete job'})
    }
})


export default jobRouter