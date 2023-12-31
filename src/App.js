import './App.css';
import Login from './components/Login';
import DocLayout from './DocLayout';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Appointments from './pages/Appointments';
import Patients from './pages/Patients';
import { AuthProvider } from './contexts/AuthContext';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ResetPass from './components/ResetPass';
import PrivateRoute from './components/PrivateRoute';


function App() {
  return (
    
      <Router>
        <AuthProvider>
            <Routes>
              <Route element={<PrivateRoute/>}>
                <Route exact path='/' element={<DocLayout/>}>
                  <Route index path='/home' element={<Home/>}/>
                  <Route path='/patients' element={<Patients/>}/>
                  <Route path='/appointments' element={<Appointments/>}/>
                  <Route path='/profile' element={<Profile/>}/>
                </Route>
              </Route>
              <Route path='/login' element={<Login/>}/>
              <Route path='/resetpassword' element={<ResetPass/>}/>
            </Routes>
        </AuthProvider>
      </Router>
   
  );
}

export default App;
