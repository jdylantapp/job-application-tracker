import { useEffect, useState } from "react"
import toast from 'react-hot-toast'

import { JobList } from "../components/JobList"
import { AddJobModal } from "../components/AddJobModal"
import { DeleteConfirmModal } from "../components/DeleteConfirmModal"
import {EditJobModal} from "../components/EditJobModal"
import { StatsCard } from "../components/StatsCard"
import { StatsGraph } from "../components/StatsGraph"
import { Filterbar } from "../components/Filterbar"


import jobService from "../services/jobs"



const DashboardPage =  () => {

    const [jobs, setJobs] = useState([])

    const [date, setDate] = useState('')
    const [company, setCompany] = useState('')
    const [title, setTitle] = useState('')
    const [status, setStatus] = useState('Applied')

    const [companyFilter, setCompanyFilter] = useState('')
    const [statusFilter, setStatusFilter] = useState('-')

    const [editDate, setEditDate] = useState('')
    const [editCompany, setEditCompany] = useState('')
    const [editTitle, setEditTitle] = useState('')
    const [editStatus, setEditStatus] = useState('')

    const [jobToDelete, setJobToDelete] = useState(null)
    const [jobToEdit, setJobToEdit] = useState(null)

    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)

    const [loading, setLoading] = useState(true)


    useEffect(() => {
        jobService.getJobs()
        .then(jobs => setJobs(jobs))
        .finally(() => setLoading(false))
    },[])

    const totalJobs = jobs.length
    const jobApplied = jobs.filter((job) => job.status === "Applied").length
    const jobInterviews = jobs.filter((job) => job.status === "Interview").length
    const jobOffers = jobs.filter((job) => job.status === "Offer").length
    const jobRejected = jobs.filter((job) => job.status === "Rejected").length

    const filteredJobs = jobs.filter(job => {
        const matchesCompany =
        companyFilter === '' ||
        job.company.toLowerCase().includes(companyFilter.toLowerCase())

        const matchesStatus =
        statusFilter === '-' ||
        job.status === statusFilter

        return matchesCompany && matchesStatus
    })

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

            {jobs.length >= 1 &&
            <div className="flex flex-col gap-10 w-full mt-15">
                <h3 className="text-6xl font-bold pl-10">Insights</h3>

                {loading ? (
                    <span className="loading loading-spinner loading-xl"></span>
                ) : 
                jobs.length === 0 ? (
                    <p className="text-center text-xl mt-10">No jobs yet</p>
                ) :
                (
                    <div className="flex w-11/12 mb-10">
                        <StatsGraph
                        appliedJobs={jobApplied}
                        interviewJobs={jobInterviews}
                        offerJobs={jobOffers}
                        rejectedJobs={jobRejected}/>

                        <div className="grid grid-cols-2 grid-rows-2 gap-5 mr-5 justify-center">

                            <StatsCard
                            title="Total Jobs"
                            number={totalJobs}
                            percentage=""/>

                            <StatsCard
                            title="Interviews"
                            number={jobInterviews}
                            percentage={"(" + jobInterviews/totalJobs * 100 + "%" + ")"}/>

                            <StatsCard
                            title="Rejected"
                            number={jobRejected}
                            percentage={"(" + jobRejected/totalJobs * 100 + "%" + ")"}/>

                            <StatsCard
                            title="Offers"
                            number={jobOffers}
                            percentage={"(" + jobOffers/totalJobs * 100 + "%" + ")"}/>         
                        </div>
                    </div>
                )}

                
                
            </div>}
        
            <div className="flex justify-between items-center w-full mt-15">
                <h3 className="text-6xl font-bold pl-10">Job Applications</h3>
                <button onClick={() => setIsAddModalOpen(true)} className="btn btn-soft btn-success text-2xl mr-40 h-15 w-40">Add Job +</button>
            </div>

            {loading ? (
                    <span className="loading loading-spinner loading-xl"></span>
                ) : 
                jobs.length === 0  ? (
                    <p className="text-center text-xl mt-10">No jobs yet</p>
                ) : 
                (<>
                    <Filterbar
                    company={companyFilter}
                    filterCompany={({target}) => setCompanyFilter(target.value)}
                    status={statusFilter}
                    filterStatus={({target}) => setStatusFilter(target.value)}/>

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
                        jobs={filteredJobs}
                        confirmDelete={openDeleteConfirm}
                        openEdit={openEditModal}
                    />
                </>
                )}

        </div>
    )
}

export default DashboardPage