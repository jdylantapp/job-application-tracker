export const EditJobModal = ({
    editCompany,
    setEditCompany,
    editTitle,
    setEditTitle,
    editStatus,
    setEditStatus,
    editDate,
    setEditDate,
    handleEdit,
    closeModal}) => {


    return (
        <dialog open id="my_modal_3" className="modal">
            <div className="modal-box">
                <form method="dialog">
                <button type="button" onClick={closeModal} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <h3 className="text-3xl font-bold mb-4">Edit Job Application</h3>
                <form onSubmit={handleEdit} className="space-y-4">

                    <fieldset className="fieldset">
                        <legend className="fieldset-legend text-xl">Company</legend>
                        <input required type="text" className="input" placeholder={editCompany} value={editCompany} onChange={setEditCompany} />
                        <p className="label">Required</p>
                    </fieldset>

                    <fieldset className="fieldset">
                        <legend className="fieldset-legend text-xl">Job Title</legend>
                        <input required type="text" className="input" placeholder={editTitle} value={editTitle} onChange={setEditTitle} />
                        <p className="label">Required</p>
                    </fieldset>

                    <fieldset className="fieldset">
                        <legend className="fieldset-legend text-xl">Application Status</legend>
                        <select
                        className="select select-bordered w-full"
                        value={editStatus}
                        onChange={setEditStatus}
                        >
                            <option>Applied</option>
                            <option>Interview</option>
                            <option>Offer</option>
                            <option>Rejected</option>
                        </select>
                    </fieldset>

                    <fieldset className="fieldset">
                        <legend className="fieldset-legend text-xl">Date Applied</legend>
                        <input type="date" className="input" placeholder={editDate} value={editDate} onChange={setEditDate} />
                    </fieldset>

                    <div className='flex justify-end space-x-3 mt-10'>
                        <button type="button" onClick={closeModal} className='btn btn-outline btn-error text-lg'>Cancel</button>
                        <button type="submit" className='btn btn-outline btn-success text-lg'>Update Job</button>
                    </div>
                </form>
            </div>
        </dialog>
    )
}