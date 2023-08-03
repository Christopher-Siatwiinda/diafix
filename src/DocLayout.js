import Header from './components/Dashboard/Header';
import SubHeader from './components/Dashboard/SubHeader';
import Footer from './components/Dashboard/Footer'
import DocProfile from './components/DocProfile';
import { useAuth } from './contexts/AuthContext';
import { Outlet } from 'react-router-dom';

export default function DocLayout() {
  const { currentUser } = useAuth();

  return (
    <div>
        <Header/>
        <SubHeader/>
        <div className='container mb-4'>
          <Outlet key={currentUser.uid} currentUser={currentUser}/>
        </div>
        <Footer/>
    </div>
  )
}
