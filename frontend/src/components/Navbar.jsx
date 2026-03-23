import { useAuth } from "../context/AuthContext.jsx"

const Navbar = () => {

    const {user, loginWithGoogle, logout} = useAuth()

    return (
        <div className="navbar bg-base-100 py-4 shadow">
            <div className="flex-1">
                <span className="text-4xl font-bold pl-10">Job Tracker</span>
            </div>

            <div className="flex-none pr-4">
                {user ? (
                    <button className="btn btn-error btn-lg" onClick={logout}>
                        Logout
                    </button>
                ) : (
                    <button className="btn btn-primary btn-lg" onClick={loginWithGoogle}>
                        Login
                    </button>
                )}
            </div>
        </div>
    )
}

export default Navbar