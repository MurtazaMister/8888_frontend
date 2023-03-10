import './Homepage.css'
import Button from '../../Components/Button/Button'
import { useContext, useEffect, useState } from 'react'

import Clock from '../../Components/Clock/Clock';

import StatusContext from '../../Contexts/StatusContext';
import TimeContext from '../../Contexts/TimeContext';
import TagContext from '../../Contexts/TagContext';
import axios from 'axios';
import UserContext from '../../Contexts/UserContext';

function Homepage({sessionMapper, formattedDate}){

    const {play_pause, setPlay_Pause} = useContext(StatusContext);
    const {time, setTime, timer, setTimer, degree, setDegree} = useContext(TimeContext);
    const {tags, setTags, selectedTags, setSelectedTags} = useContext(TagContext);
    const {user, sessions, setSessions} = useContext(UserContext);

    function playStateChange(e){
        if(play_pause=='play'){
            if(selectedTags.length == 0){
                document.getElementsByClassName('sidebar')[1].style.width = "25%";
            }
            else{
                setPlay_Pause('pause')
            }
        }
        else if(play_pause=='pause'){
            setPlay_Pause('play')
        }
    }
    
    function tagStateChange(e){
        
    }

    function stopper(e){

        // make an api call and save the timer
        selectedTags.forEach(selectedTag => {
            const response = axios.post(`${import.meta.env.VITE_APP_SERVER}/Sessions`,{
                "tagId": selectedTag.id,
                "userId": user,
                "timeSpent": time,
                "date": formattedDate({add:false})
            },{
                headers:{
                    'Content-Type':'application/json'
                }
            }).then((data)=>(data.data)).then((data)=>{
                setSelectedTags(selectedTags.filter(selectedTagRemover => selectedTagRemover.id != selectedTag.id))
                setTags(tags.map(tag=>{
                    if(tag.id == selectedTag.id){
                        tag.selected = false
                    }
                    return tag;
                }));
                setSessions(sessionMapper([data], sessions));
            });
        });

        clearTimeout(timer)
        setDegree(0);
        setTime(0);
        setPlay_Pause('play')
        document.querySelectorAll('.hand:not(#hand)').forEach((ele)=>{
            ele.remove();
        })
    }

    return(
        <div id="homepage">
            <div className="clock-holder">
                <Clock />
            </div>
            <div className="buttons">
                <Button type={play_pause} stateChange={playStateChange} />
                {time>0  && <Button type="stop" stateChange={stopper} />}
            </div>
        </div>
    )
}

export default Homepage