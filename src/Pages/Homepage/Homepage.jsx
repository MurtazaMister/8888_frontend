import './Homepage.css'
import Button from '../../Components/Button/Button'
import { useEffect, useState } from 'react'

function Homepage(){

    const [play_pause, setPlay_Pause] = useState('play')
    const [tag_comment, setTag_Comment] = useState('tag')

    useEffect(()=>{
        document.getElementById(`button-${play_pause}`).classList.add('adder')
        
        let other_buttons = document.getElementsByClassName(`status-buttons`)
        for(let button of other_buttons){
            if(button.id != `button-${play_pause}`){
                button.classList.add('pseudo-adder')
            }
        }

    }, [play_pause])

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
                    <div className="straight vertical"></div>
                    <div className="straight horizontal"></div>
                    <div className="angled one-seven"></div>
                    <div className="angled two-eight"></div>
                    <div className="angled four-ten"></div>
                    <div className="angled five-eleven"></div>
                </div>
            </div>
            <div className="buttons">
                <Button type={tag_comment} stateChange={tagStateChange}/>
                <Button type={play_pause} stateChange={playStateChange} />
                {/* {play_pause=='pause' && <Button type="stop" />} */}
            </div>
        </div>
    )
}

export default Homepage