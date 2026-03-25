import { useAuth } from "../context/AuthContext.jsx"

const HomePage = () => {
  const {loginWithGoogle} = useAuth()

    return (
      <div
        className="hero h-screen"
        style={{
          backgroundImage:
            "url(../../../assets/heroImage1.png)",
        }}
      >
        <div className="hero-overlay bg-black/70"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Job Tracker</h1>
            <p className="mb-5">
              Track your job applications, monitor interview stages, and keep your search organized in one place.
            </p>
            <button className="btn btn-primary" onClick={loginWithGoogle}>Get Started</button>
          </div>
        </div>
      </div>
    )
  }
  
  export default HomePage