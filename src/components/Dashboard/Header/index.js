import { useAuth } from '../../../contexts/AuthContext';
import { useNavigate } from "react-router-dom";

export default function Index() {
  const navigate = useNavigate();
  const {  logout } = useAuth();

  async function handleLogout() {
      
    try {
      await logout();
      navigate('/login')
    }catch(err){
      console.log(err.message);
    }
  
    };

  return (
    <div className='container'>
      <nav id='header' style={{height: 50+"px"}} className='narbar navbar-expand-md bg-light mb-4 p-0 shadow  navbar-default fixed-top d-flex align-items-center justify-content-center'>
          <div className='container d-flex align-items-center'>
              <a className="navbar-brand text-light col-md-3 col-lg-2 me-0 ms-0" href="#">
                <h4>DiaFix</h4> 
              </a>

              <div className="d-flex ms-auto align-items-center">
                <button onClick={handleLogout}
                  style={{borderStyle: 'none',  
                  paddingTop: 5+"px",
                  paddingRight: 35+'px',
                  paddingLeft: 35+'px',
                  paddingBottom: 5+'px',
                  marginRight: 0+"px"}}  className="nav-item text-nowrap">
                    Logout
                  </button>
              </div>
          </div>
        </nav>
    </div>
  )
}
