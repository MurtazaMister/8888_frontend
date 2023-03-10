import './App.css'
import Sidebar from './Pages/Sidebar/Sidebar'
import Homepage from './Pages/Homepage/Homepage'
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from './Pages/LoginPage/LoginPage';
import SignupPage from './Pages/SignupPage/SignupPage';
import { useState } from "react";

import { TimeProvider } from './Contexts/TimeContext';
import { StatusProvider } from './Contexts/StatusContext';
import { UserProvider } from './Contexts/UserContext';

function App() {
  
  const [play_pause, setPlay_Pause] = useState('play');

  const [time, setTime] = useState(0);
  const [timer, setTimer] = useState(undefined);
  const [user, setUser] = useState(localStorage.getItem('_8888'));

  return (
    <div id="body">
      <UserProvider value={{user, setUser}}>
        <StatusProvider value={{play_pause, setPlay_Pause}}>
          <TimeProvider value={{time, setTime, timer, setTimer}}>
            <div className='sidebar'>
              <Sidebar type='menu' />
            </div>
            <div className="rest">
              <Routes>
                <Route path="/" element={user!=null?<Homepage />:<LoginPage />}></Route>
                {user==null && <Route path="/signup" element={<SignupPage />}></Route>}
                {user==null && <Route path="*" element={<LoginPage />}></Route>}
              </Routes>
            </div>
            <div className='sidebar'>
              <Sidebar type='tag' />
            </div>
          </TimeProvider>
        </StatusProvider>
      </UserProvider>
    </div>
  )
}

export default App