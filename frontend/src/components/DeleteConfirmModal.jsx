export const DeleteConfirmModal = ({
    handleDelete,
    closeModal}) => {


    return (
        <dialog open id="my_modal_3" className="modal">
            <div className="modal-box">
                <form method="dialog">
                <button type="button" onClick={closeModal} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <h3 className="text-3xl font-bold mb-4">Delete Job Application</h3>
                <p>Are you sure you want to delete this job application?</p>
                <div className='flex justify-end space-x-3 mt-10'>
                    <button type="button" onClick={closeModal} className='btn btn-outline text-lg'>Cancel</button>
                    <button type="submit" onClick={handleDelete} className='btn btn-outline btn-error text-lg'>Delete</button>
                </div>
            </div>
        </dialog>
    )
}