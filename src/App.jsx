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

function App() {
  
  const [play_pause, setPlay_Pause] = useState('play');

  const [time, setTime] = useState(0);
  const [timer, setTimer] = useState(undefined);

  return (
    <div id="body">
      <StatusProvider value={{play_pause, setPlay_Pause}}>
        <TimeProvider value={{time, setTime, timer, setTimer}}>
          <div className='sidebar'>
            <Sidebar type='menu' />
          </div>
          <div className="rest">
            <Routes>
              <Route path="/" element={<Homepage />}></Route>
            </Routes>
          </div>
          <div className='sidebar'>
            <Sidebar type='tag' />
          </div>
        </TimeProvider>
      </StatusProvider>
    </div>
  )
}

export default App