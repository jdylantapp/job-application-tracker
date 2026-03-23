import { useEffect, useState } from "react"
import toast from 'react-hot-toast'

import { JobList } from "../components/JobList"
import { AddJobModal } from "../components/AddJobModal"
import { DeleteConfirmModal } from "../components/DeleteConfirmModal"
import {EditJobModal} from "../components/EditJobModal"


import jobService from "../services/jobs"



const DashboardPage =  () => {

    const [jobs, setJobs] = useState([])

    const [date, setDate] = useState('')
    const [company, setCompany] = useState('')
    const [title, setTitle] = useState('')
    const [status, setStatus] = useState('Applied')

    const [editDate, setEditDate] = useState('')
    const [editCompany, setEditCompany] = useState('')
    const [editTitle, setEditTitle] = useState('')
    const [editStatus, setEditStatus] = useState('')

    const [jobToDelete, setJobToDelete] = useState(null)
    const [jobToEdit, setJobToEdit] = useState(null)

    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)


    useEffect(() => {
        jobService.getJobs()
        .then(jobs => setJobs(jobs))
    },[])

    const handleAddJob = async (event) => {
        event.preventDefault()

        try {
            const jobObject = {
                title: title,
                company: company,
                dateApplied: date,
                status: status
            }
    
            const returnedJob = await jobService.addJob(jobObject)
            setJobs(previousJobs => 
            [...previousJobs, returnedJob].sort ((a, b) => new Date(b.dateApplied) - new Date(a.dateApplied))
            )
            setCompany('')
            setTitle('')
            setDate('')
            setStatus('Applied')
            setIsAddModalOpen(false)
            toast.success("Job Successfully Added")
        }
        catch {
            toast.error("Failed to Add Job")
        }
    }

    const openDeleteConfirm = (job) => {
        setIsDeleteModalOpen(true)
        setJobToDelete(job)
    }

    const handleDeleteJob = async (job) => {
        try {
            await jobService.deleteJob(job.id)
            setJobs(prevJobs =>
            prevJobs.filter(j => j.id !== job.id)
            )
            setIsDeleteModalOpen(false)
            setJobToDelete(null)
            toast.success("Job Successfully Removed")
        }
        catch {
            toast.error("Failed to Remove Job")
        }
        
    }

    const openEditModal = (job) => {
        setJobToEdit(job)

        setEditDate(job.dateApplied.slice(0, 10))
        setEditCompany(job.company)
        setEditTitle(job.title)
        setEditStatus(job.status)

        setIsEditModalOpen(true)
    }

    const handleEditJob = async (event, job) => {
        event.preventDefault()
        try {
            const editedJob = {
                dateApplied: editDate,
                company: editCompany,
                title: editTitle,
                status: editStatus
            }
            const updatedJob = await jobService.updateJob(job.id, editedJob)
            setJobs(prevJobs =>
                prevJobs
                .map(j => j.id === updatedJob.id ? updatedJob : j)
                .sort((a, b) => new Date(b.dateApplied) - new Date(a.dateApplied))
            )

            setIsEditModalOpen(false)
            setJobToEdit(null)
            setEditDate('')
            setEditCompany('')
            setEditTitle('')
            setEditStatus('')

            toast.success("Job Successfully Updated")
        }
        catch {
            toast.error("Failed to Update Job")
        }
    }



    return (
        <div>
            <div className="flex justify-between items-center w-full mt-15">
                <h3 className="text-6xl font-bold pl-10">Your Jobs</h3>
                <button onClick={() => setIsAddModalOpen(true)} className="btn btn-soft btn-success text-2xl mr-40 h-15 w-40">Add Job +</button>
            </div>

            {isAddModalOpen && 
            <AddJobModal 
            closeModal={() => setIsAddModalOpen(false)}
            submitForm={handleAddJob}
            newCompany={company}
            setNewCompany={({target}) => setCompany(target.value)}
            newTitle={title}
            setNewTitle={({target}) => setTitle(target.value)}
            newStatus={status}
            setNewStatus={({target}) => setStatus(target.value)}
            newDate={date}
            setNewDate={({target}) => setDate(target.value)}
            />}

            {isDeleteModalOpen &&
            <DeleteConfirmModal
            closeModal={() => {
                setIsDeleteModalOpen(false)
                setJobToDelete(null)
            }}
            handleDelete={()=> handleDeleteJob(jobToDelete)}/>}

            {isEditModalOpen &&
            <EditJobModal
            editCompany={editCompany}
            setEditCompany={({target}) => setEditCompany(target.value)}
            editTitle={editTitle}
            setEditTitle={({target}) => setEditTitle(target.value)}
            editStatus={editStatus}
            setEditStatus={({target}) => setEditStatus(target.value)}
            editDate={editDate}
            setEditDate={({target}) => setEditDate(target.value)}
            closeModal={() => {
                setIsEditModalOpen(false)
                setJobToEdit(null)
            }}
            handleEdit={(event)=> handleEditJob(event, jobToEdit)}/>}
            
            <JobList
                jobs={jobs}
                confirmDelete={openDeleteConfirm}
                openEdit={openEditModal}
            />

        </div>
    )
}

export default DashboardPage