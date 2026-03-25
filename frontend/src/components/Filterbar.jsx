export const Filterbar = ({company, filterCompany, status, filterStatus}) => {
    return (
        <div className="flex gap-5 mt-20 max-w-9/10 mx-auto justify-start items-center px-15">
            <h3 className="font-bold text-lg">Filter: </h3>
            <input type="text" placeholder="Company" className="input w-50" value={company} onChange={filterCompany}></input>
            <select className="select w-50" value={status} onChange={filterStatus}>
                <option>-</option>
                <option>Applied</option>
                <option>Interview</option>
                <option>Offer</option>
                <option>Rejected</option>
            </select>
        </div>
        
    )
}