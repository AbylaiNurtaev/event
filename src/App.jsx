import { React } from 'react'
import {Route, Routes} from 'react-router-dom'
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
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<HomePage></HomePage>}></Route>
          <Route path='/about' element={<AboutPage/>}></Route>
          <Route path='/nominations' element={<Nominations/>}></Route>
          <Route path='/joury' element={<JouryPage/>}></Route>
          <Route path='/contacts' element={<ContactPage/>}></Route>
          <Route path='/login' element={<AuthorizationPage/>}></Route>
          <Route path='/payment' element={<PaymentPage/>}></Route>
          <Route path='/grading' element={<GradingPage/>}></Route>
          <Route path='/application/:applicationId' element={<ApplicationPage/>}></Route>
          <Route path='/cabinet/:id' element={<CabinetPage/>}></Route>
        </Route>
        <Route path='/admin' element={<AdminPage/>}></Route>
        <Route path='/adminApplication/:id' element={<AdminApplication/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
