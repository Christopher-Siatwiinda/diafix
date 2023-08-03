import { useState } from "react";
import Header from '../Header';
import './main.css';
import { FaFacebookF } from 'react-icons/fa';
import { FaGooglePlusG } from 'react-icons/fa';
import { FaLinkedinIn } from 'react-icons/fa';
import { Alert } from '@mui/material';
import { useAuth } from "../../../contexts/AuthContext";
import logo192 from '../../../assets/logo192.png';
import { Link } from "react-router-dom";
import Spinner from "../../Spinner";

export default function Auth() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, signin, currentUser } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false)
   

    console.log(email)
    console.log(password)    
    async function handleLogin(e) {
      e.preventDefault();
      try {
        setError("")
        setLoading(true);
        await login(email, password)
      }catch(err){
        setError("Wrong email or password, try again!");
      }

      setLoading(false);
    };


  if (loading) return <Spinner/>
  
  return (
    <div>
      <div className="form container-form">
        <div className="form-container sign-in-container">
            <form className="form-login">
              <div className='text-center mb-2'>
                  <img src={logo192} alt="logo" className='logo3' />
              </div>
              <h3 style={{marginBottom: 30+"px"}}>Log in</h3>
              {error && <Alert severity="error">{error}</Alert>}
              <input onChange={(event) => {setEmail(event.target.value)}} type="email" placeholder="Email" />
              <input onChange={(event) => {setPassword(event.target.value)}} type="password" placeholder="Password" />
              <Link className="a" to='/resetpassword'>Forgot your password?</Link>
              <button disabled={loading} style={{marginBottom: 20+"px"}} onClick={handleLogin}>Login</button>
              <span>Follow us on</span>
              <div className="social-container">
                <a href="#" className="social"><FaFacebookF/></a>
                <a href="#" className="social"><FaGooglePlusG/></a>
                <a href="#" className="social"><FaLinkedinIn/></a>
              </div>
            </form>
        </div>   
      </div>
    </div>
  )
}
