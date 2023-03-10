import './Homepage.css'
import Button from '../../Components/Button/Button'
import { useContext, useEffect, useState } from 'react'

import StatusContext from '../../Contexts/StatusContext';
import TimeContext from '../../Contexts/TimeContext';

function Homepage(){

    const {play_pause, setPlay_Pause} = useContext(StatusContext);
    const {time, setTime, timer, setTimer} = useContext(TimeContext);

    const [degree, setDegree] = useState(0);
    const [opArr, setOpArr] = useState(new Array(15).fill(0).map((el,ind)=>((15-ind)/15).toFixed(2)))

    useEffect(()=>{
        let init = Date.now()
        if(play_pause=='pause'){
            setTimer(setTimeout(()=>{
                setDegree(6*((time+1)));
                setTime(time+1);
                let fin = Date.now();
                // console.log("This should be 1000 -> ",fin-init);
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
                document.querySelector('.clock').childNodes[2].remove()
            }

            Array.from(document.querySelector('.clock').childNodes).reverse().forEach(
                (el,ind)=>{if(ind<document.querySelector('.clock').childElementCount-2)el.style.opacity=opArr[Math.round(ind/2)-1]}
            )
        }
    },[degree])

    function playStateChange(e){
        if(play_pause=='play'){
            setPlay_Pause('pause')
        }
        else if(play_pause=='pause'){
            setPlay_Pause('play')
        }
    }
    
    function tagStateChange(e){
        
    }

    function stopper(e){
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
                <div className="clock">
                    {/* <div className="straight vertical"></div>
                    <div className="straight horizontal"></div>
                    <div className="angled one-seven"></div>
                    <div className="angled two-eight"></div>
                    <div className="angled four-ten"></div>
                    <div className="angled five-eleven"></div> */}
                    <div className="hand" id='hand'></div>
                    <div className="time">
                        {`${String(Math.floor(time/3600)).padStart(2,'0')}:
                        ${String(Math.floor(time/60)).padStart(2,'0')}:
                        ${String(time%60).padStart(2,'0')}`}
                    </div>
                </div>
            </div>
            <div className="buttons">
                {time>0 && <Button type='comment' stateChange={tagStateChange}/>}
                <Button type={play_pause} stateChange={playStateChange} />
                {time>0  && <Button type="stop" stateChange={stopper} />}
            </div>
        </div>
    )
}

export default Homepage