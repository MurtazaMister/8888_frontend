import './Homepage.css'
import Button from '../../Components/Button/Button'
import { useEffect, useState } from 'react'

function Homepage(){

    const [play_pause, setPlay_Pause] = useState('play');
    const [tag_comment, setTag_Comment] = useState('tag');
    const [time, setTime] = useState(0);
    const [timer, setTimer] = useState(undefined);
    const [degree, setDegree] = useState(0);
    const [opArr, setOpArr] = useState(new Array(15).fill(0).map((el,ind)=>((15-ind)/15).toFixed(2)))

    useEffect(()=>{
        let init = Date.now()
        if(play_pause=='pause'){
            setTimer(setTimeout(()=>{
                setDegree(degree+6);
                setTime(time+1);
                let fin = Date.now();
                console.log("This should be 1000 -> ",fin-init);
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
                (el,ind)=>{if(ind<document.querySelector('.clock').childElementCount-2) el.style.opacity = opArr[Math.round(ind/2) - 1]}
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
        if(tag_comment=='tag'){
            setTag_Comment('comment')
        }
        else if(tag_comment=='comment'){
            setTag_Comment('tag')
        }
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
                        {`${String(Math.floor(time/3600)).padStart(2,'0')}:${String(Math.floor(time/60)).padStart(2,'0')}:${String(time%60).padStart(2,'0')}`}
                    </div>
                </div>
            </div>
            <div className="buttons">
                <Button type={tag_comment} stateChange={tagStateChange}/>
                <Button type={play_pause} stateChange={playStateChange} />
                {time>0  && <Button type="stop" />}
            </div>
        </div>
    )
}

export default Homepage