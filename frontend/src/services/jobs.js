import axios from 'axios'
import {auth} from './firebase'

const baseUrl = '/api/jobs'

const getToken = async () => {

    const user = auth.currentUser

    if (!user) {
        throw new Error('user is not signed in')
    }

    const token = await user.getIdToken()
    const config = {
        headers: {Authorization: `Bearer ${token}`}
    }
    return config

}

const getJobs = async() => {
    const config = await getToken()

    const response = await axios.get(baseUrl, config)
    return response.data
}

const addJob = async(newJob) => {
    const config = await getToken()

    const response = await axios.post(baseUrl, newJob, config)
    return response.data
}

const updateJob = async(jobId, updatedJob) => {
    const config = await getToken()

    const response = await axios.put(`${baseUrl}/${jobId}`, updatedJob, config)
    return response.data
}

const deleteJob = async(jobId) => {
    const config = await getToken()

    const response = await axios.delete(`${baseUrl}/${jobId}`, config)
    return response.data
}

export default {getJobs, addJob, updateJob, deleteJob}