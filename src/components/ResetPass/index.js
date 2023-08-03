import { useState } from "react";
import Header from '../Login/Header';
import '../Login/MainBody/main.css';
import {FaFacebookF} from 'react-icons/fa';
import {FaGooglePlusG} from 'react-icons/fa';
import {FaLinkedinIn} from 'react-icons/fa';
import { Alert } from '@mui/material';
import { useAuth } from "../../contexts/AuthContext";
import logo192 from '../../assets/logo192.png';
import { Link } from 'react-router-dom';

export default function Index() {
    const [email, setEmail] = useState('');
    const { resetPassword } = useAuth();
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false)
   

    console.log(email)   
    async function handleResetPassword(e) {
      e.preventDefault();
      try{
        await resetPassword(email);
        setMessage("Check you email for further instructions");
      }catch(err){
        setError("Failed to reset password, please try again with correct email!");
      }
    };
  return (
    <div>
      <Header/>
      <div className="form container-form">
        <div className="form-container sign-in-container">
            <form>
              <div className='text-center mb-2'>
                  <img src={logo192} alt="logo" className='logo3' />
              </div>
              <h3 style={{marginBottom: 30+"px"}}>Password Reset</h3>
              {error && <Alert severity="error">{error}</Alert>}
              {message && <Alert severity="success">{message}</Alert>}
              <input onChange={(event) => {setEmail(event.target.value)}} type="email" placeholder="Email" />
              <Link className="a" to='/login'>Go back to login</Link>
              <button style={{marginBottom: 20+"px"}} onClick={handleResetPassword}>Reset</button>
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
