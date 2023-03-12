import './App.css'
import Sidebar from './Pages/Sidebar/Sidebar'
import Homepage from './Pages/Homepage/Homepage'
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from './Pages/LoginPage/LoginPage';
import SignupPage from './Pages/SignupPage/SignupPage';
import { useEffect, useState } from "react";

import { TimeProvider } from './Contexts/TimeContext';
import { StatusProvider } from './Contexts/StatusContext';
import { UserProvider } from './Contexts/UserContext';
import { TagProvider } from './Contexts/TagContext';
import axios from 'axios';
import TagPage from './Pages/TagPage/TagPage';

function App() {
  
  const [play_pause, setPlay_Pause] = useState('play');

  const [time, setTime] = useState(0);
  const [timer, setTimer] = useState(undefined);
  const [degree, setDegree] = useState(0);
  const [user, setUser] = useState(localStorage.getItem('_8888'));
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [dragged, setDragged] = useState(undefined);

  useEffect(()=>{
    if(user!=null){
      const response = axios.get(`${import.meta.env.VITE_APP_SERVER}/Tags/${user}`,{
        headers:{
            'Content-Type':'application/json'
        }
      }).then((data)=>(data.data)).then((data)=>{setTags(data)});
    }

  }, [user])

  return (
    <div id="body">
      <UserProvider value={{user, setUser}}>
        <TagProvider value={{tags, setTags, selectedTags, setSelectedTags, dragged, setDragged}}>
          <StatusProvider value={{play_pause, setPlay_Pause}}>
            <TimeProvider value={{time, setTime, timer, setTimer, degree, setDegree}}>
              <div className='sidebar'>
                <Sidebar type='menu' />
              </div>
              <div className="rest">
                <Routes>
                  <Route path="/" element={user!=null?<Homepage />:<LoginPage />}></Route>
                  <Route path="/tags" element={user!=null?<TagPage />:<LoginPage />}></Route>
                  {user==null && <Route path="/signup" element={<SignupPage />}></Route>}
                  {user==null && <Route path="*" element={<LoginPage />}></Route>}
                </Routes>
              </div>
              <div className='sidebar'>
                <Sidebar type='tag' />
              </div>
            </TimeProvider>
          </StatusProvider>
        </TagProvider>
      </UserProvider>
    </div>
  )
}

export default App