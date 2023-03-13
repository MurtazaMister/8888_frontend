import './App.css'
import Sidebar from './Pages/Sidebar/Sidebar'
import Homepage from './Pages/Homepage/Homepage'
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from './Pages/LoginPage/LoginPage';
import SignupPage from './Pages/SignupPage/SignupPage';
import Timeline from './Pages/Timeline/Timeline';
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
  const [sessions, setSessions] = useState();

  function sessionMapper(datas, premap=undefined){
    let map = premap?premap:{};
    datas.forEach((data) => {
      let tagId = data.tagId;
      let timeSpent = data.timeSpent;
      let date = data.date;
      if(tagId){
        
        map[date] = map[date]?map[date]:{};
        map[date][tagId] = map[date][tagId]?(map[date][tagId]+Number(timeSpent)):Number(timeSpent);

      }
    });
    return map;
  }

  const formattedDate = (params = {add:true, supply:false, date:false}) => {
    if(params.add==undefined){
      params['add'] = true;
    }
    if(params.supply==undefined){
      params['supply'] = false;
    }
    if(params.date==undefined){
      params['date'] = false;
    }
    if(params.supply){
      return params.supply.substr(0,10)+(params.add?'T00:00:00':'')
    }
    let d = (!params.date?(new Date()):params.date)
    let cd = num => num.toString().padStart(2, 0)
    return d.getFullYear()+"-"+cd(d.getMonth() + 1)+"-"+cd(d.getDate())+(params.add?'T00:00:00':'');
  }

  useEffect(()=>{
    if(user!=null){
      const response = axios.get(`${import.meta.env.VITE_APP_SERVER}/Tags/${user}`,{
        headers:{
            'Content-Type':'application/json'
        }
      }).then((data)=>(data.data)).then((data)=>{
        setTags(data)}
      );
    }

  }, [user])

  useEffect(()=>{
    if(user!=null){
      const response = axios.get(`${import.meta.env.VITE_APP_SERVER}/Sessions/${user}`,{
        headers:{
            'Content-Type':'application/json'
        }
      }).then((data)=>(data.data)).then((datas)=>{
        setSessions(sessionMapper(datas));
      });
    }
  }, [user]);

  return (
    <div id="body">
      <UserProvider value={{user, setUser, sessions, setSessions}}>
        <TagProvider value={{tags, setTags, selectedTags, setSelectedTags, dragged, setDragged}}>
          <StatusProvider value={{play_pause, setPlay_Pause}}>
            <TimeProvider value={{time, setTime, timer, setTimer, degree, setDegree}}>
              <div className='sidebar'>
                <Sidebar type='menu' />
              </div>
              <div className="rest">
                <Routes>
                  <Route path="/" element={user!=null?<Homepage formattedDate={formattedDate} sessionMapper={sessionMapper} />:<LoginPage />}></Route>
                  <Route path="/tags" element={user!=null?<TagPage />:<LoginPage />}></Route>
                  <Route path="/timeline" element={user!=null?<Timeline formattedDate={formattedDate} />:<LoginPage />}></Route>
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