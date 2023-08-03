import { Link } from "react-router-dom";

export default function index() {
  return (
    <div class="container">
    <header style={{paddingLeft: 10+"px"}} class="d-flex flex-wrap justify-content-center align-items-center mb-3 border-bottom shadow rounded-bottom bg-white">
      <a href="/" class="d-flex align-items-center mb-0 mb-md-0 me-md-auto text-dark text-decoration-none">
        <span class="fs-4 mb-4">Dashboard</span>
      </a>

      <ul class="nav ">
        <li class="nav-item"><Link to="/home" className="link-link">Home</Link></li>
        <li class="nav-item"><Link to="/patients" className="link-link">Patients</Link></li>
        <li class="nav-item"><Link to="/appointments" className="link-link ">Appointments</Link></li>
        <li class="nav-item"><Link to="/profile" className="link-link">Profile</Link></li>
      </ul>
    </header>
  </div>

  )
}
