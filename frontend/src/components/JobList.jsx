export const JobList = ({jobs, confirmDelete, openEdit}) => {
    return (
        <div className="max-w-9/10 mx-auto">
            <table className="table table-pin-rows px-10 py-10 text-xl text-center">
                <thead className="sticky top-0 bg-base-300 z-10">
                    <tr className="text-2xl bg-base-200">
                        <th></th>
                        <th>Date</th>
                        <th>Company</th>
                        <th>Title</th>
                        <th>Status</th>
                        <th>Options</th>
                    </tr>
                </thead>

                <tbody>
                    {jobs.map((job, index) => 
                        <tr key={job.id}>
                            <th>{index + 1}</th>
                            <td>{job.dateApplied.slice(0, 10)}</td>
                            <td>{job.company}</td>
                            <td>{job.title}</td>
                            <td>{job.status}</td>
                            <td className="flex space-x-4 justify-center">
                                <button onClick={() => openEdit(job)} className="btn btn-outline">Edit</button>
                                <button onClick={() => confirmDelete(job)} className="btn btn-outline btn-error">Delete</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
       
    )
}