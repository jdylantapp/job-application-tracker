export const StatsCard = ({number,percentage, title}) => {
    return (
        <div className="card-xl hover:bg-base-200 rounded-2xl card-border border-gray-800 bg-base-300 w-96">
            <div className="card-body pt-4">
                <h2 className="card-title text-3xl mb-5">{title}</h2>
                <p className="text-center text-4xl font-bold">{number}</p>
                <p className="text-center text-gray-600">{percentage}</p>
            </div>
        </div>

    )
    
}