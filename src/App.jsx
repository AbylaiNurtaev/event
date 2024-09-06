import { React } from 'react'
import {Route, Routes} from 'react-router-dom'
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage/HomePage';
import AboutPage from './pages/AboutPage/AboutPage';
import Nominations from './pages/Nominations/Nominations';
import JouryPage from './pages/JouryPage/JouryPage';
import ContactPage from './pages/ContactPage/ContactPage';
import AuthorizationPage from './pages/AuthorizationPage/AuthorizationPage';

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
        </Route>
      </Routes>
    </div>
  );
}

export default App;
