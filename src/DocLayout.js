import Header from './components/Dashboard/Header';
import SubHeader from './components/Dashboard/SubHeader';
import Footer from './components/Dashboard/Footer';
import { useAuth } from './contexts/AuthContext';
import { Outlet } from 'react-router-dom';

export default function DocLayout() {

  return (
    <div>
        <Header/>
        <SubHeader/>
        <div className='container mb-4'>
          <Outlet/>
        </div>
        <Footer/>
    </div>
  )
}
