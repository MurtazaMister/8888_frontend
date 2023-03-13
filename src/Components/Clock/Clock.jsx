import './Clock.css'
import TimeContext from '../../Contexts/TimeContext';
import { useContext, useEffect, useState } from 'react';
import StatusContext from '../../Contexts/StatusContext';

function Clock({display=true}){

    const [opArr] = useState(new Array(15).fill(0).map((el,ind)=>((15-ind)/15).toFixed(2)));
    const {play_pause} = useContext(StatusContext);
    const {time, setTime, timer, setTimer, degree, setDegree} = useContext(TimeContext);

    useEffect(()=>{
        if(play_pause=='pause'){
            setTimer(setTimeout(()=>{
                setDegree(6*((time+1)));
                setTime(time+1);
            }, 985))
        }
        else{
            clearTimeout(timer)
        }
    }, [time, play_pause])
    
    useEffect(()=>{
        let parent = document.querySelector('.clock')
        let ele = document.getElementById('hand');
        if(ele){
            ele.style.transform = `rotate(${degree}deg)`;
            
            let child = document.createElement('div');
            child.classList.add('hand');
            child.style.transform = `rotate(${degree-3}deg)`;
            child.style.background = 'linear-gradient(#8C4303 0% 3%, transparent 3% 100%);'
            parent.appendChild(child);

            child = document.createElement('div');
            child.classList.add('hand');
            child.style.transform = `rotate(${degree-1.5}deg)`;
            child.style.background = 'linear-gradient(#8C4303 0% 3%, transparent 3% 100%);'
            parent.appendChild(child);

            while(document.querySelector('.clock').childElementCount > 32){
                document.querySelector('.clock').childNodes[display?2:1].remove()
            }

            Array.from(document.querySelector('.clock').childNodes).reverse().forEach(
                (el,ind)=>{if(ind<document.querySelector('.clock').childElementCount-2)el.style.opacity=opArr[Math.round(ind/2)-1]}
            )
        }
    },[degree])

    return (
        <div className="clock">
            <div className="hand" id='hand'></div>
            {display && <div className="time">
                {`${String(Math.floor(time/3600)).padStart(2,'0')}:${String(Math.floor(time/60)).padStart(2,'0')}:${String(time%60).padStart(2,'0')}`}
            </div>}
        </div>
    )
}

export default Clock