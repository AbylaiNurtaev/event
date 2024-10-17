import { React, useEffect, useState } from 'react'
import {Route, Routes, useNavigate} from 'react-router-dom'
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage/HomePage';
import AboutPage from './pages/AboutPage/AboutPage';
import Nominations from './pages/Nominations/Nominations';
import JouryPage from './pages/JouryPage/JouryPage';
import ContactPage from './pages/ContactPage/ContactPage';
import AuthorizationPage from './pages/AuthorizationPage/AuthorizationPage';
import CabinetPage from './pages/CabinetPage/CabinetPage';
import ApplicationPage from './pages/ApplicationPage/ApplicationPage';
import AdminPage from './pages/AdminPage/AdminPage';
import PaymentPage from './pages/PaymentPage/PaymentPage';
import GradingPage from './pages/GradingPage/GradingPage';
import AdminApplication from './pages/AdminApplication/AdminApplication';
import OpenedJoury from './pages/OpenedJoury/OpenedJoury';
import AdminCheckApplication from './pages/AdminCheckApplication/AdminCheckApplication';
import CriteryPage from './pages/CriteryPage/CriteryPage';
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedAuth = localStorage.getItem('isAuthenticated');
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
    } else {
      const pass = prompt('Введите пароль:');
      if (pass === '2626') {
        setIsAuthenticated(true);
        localStorage.setItem('isAuthenticated', 'true');
        
      } else {
        alert('Неверный пароль!');
        navigate('/baf');
      }
    }
  }, [navigate]);
  return (
    <div className="App">

      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<HomePage></HomePage>}></Route>
          <Route path='/about' element={<AboutPage/>}></Route>
          <Route path='/critery' element={<CriteryPage/>}></Route>
          <Route path='/nominations' element={<Nominations/>}></Route>
          <Route path='/joury' element={<JouryPage/>}></Route>
          <Route path='/joury/:id' element={<OpenedJoury/>}></Route>
          <Route path='/contacts' element={<ContactPage/>}></Route>
          <Route path='/login' element={<AuthorizationPage/>}></Route>
          <Route path='/payment' element={<PaymentPage/>}></Route>
          <Route path='/grading' element={<GradingPage/>}></Route>
          <Route path='/application/:applicationId' element={<ApplicationPage/>}></Route>
          <Route path='/applicationChecking/:applicationId/:id' element={<AdminCheckApplication/>}></Route>
          <Route path='/cabinet/:id' element={<CabinetPage/>}></Route>
        </Route>
        <Route path='/admin' element={<AdminPage/>}></Route>
        <Route path='/adminApplication/:id' element={<AdminApplication/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
