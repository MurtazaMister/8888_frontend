import './App.css'
import Sidebar from './Pages/Sidebar/Sidebar'
import Homepage from './Pages/Homepage/Homepage'
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from './Pages/LoginPage/LoginPage';
import SignupPage from './Pages/SignupPage/SignupPage';

function App() {

  return (
    <div id="body">
      <div className='sidebar'>
        <Sidebar />
      </div>
      <div className="rest">
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
        </Routes>
      </div>
    </div>
  )
}

export default App
