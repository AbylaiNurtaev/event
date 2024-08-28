import { React } from 'react'
import {Route, Routes} from 'react-router-dom'
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage/HomePage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<HomePage></HomePage>}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
