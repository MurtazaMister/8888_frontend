import {BsPieChart} from 'react-icons/bs'
import {FaRegChartBar} from 'react-icons/fa'
import {BsGraphUp} from 'react-icons/bs'
import './Timeline.css'
import {TbLetterD, TbLetterW, TbLetterM, TbLetterY} from 'react-icons/tb'
import Button from '../../Components/Button/Button'
import { useState } from 'react'

function Timeline(){

    const [graph, setGraph] = useState('pie')
    const [duration, setDuration] = useState('daily')

    const graphArr = ['pie', 'bar', 'line']
    const graphIcons = [<BsPieChart />, <FaRegChartBar />, <BsGraphUp />]
    const durationArr = ['daily', 'weekly', 'monthly', 'yearly']
    const durationIcons = [<TbLetterD />, <TbLetterW />, <TbLetterM />, <TbLetterY />]

    const graphChange = (e, category)=>{
        console.log(category);
    }

    const durationChange = (e, category)=>{
        console.log(category);
    }

    return (
        <div className="timeline-holder">
            <div className="timeline-header">
                <div className="timeline-icons">
                    {graphIcons.map((ele, idx)=>{
                        return <div onClick={(e)=>graphChange(e, graphArr[idx])} key={idx} className={`timeline-icon ${graphArr[idx]}-icon ${graph==graphArr[idx]?'timeline-icon-active':''}`}>
                                    <Button stateChange={undefined} type="graph" element={ele} />
                                </div>
                    })}
                </div>
                <div className="timeline-duration">
                    {durationIcons.map((ele, idx)=>{
                        return <div onClick={(e)=>durationChange(e, durationArr[idx])} key={idx} className={`timeline-icon ${durationArr[idx]}-icon ${duration==durationArr[idx]?'timeline-icon-active':''}`}>
                                    <Button stateChange={undefined} type="duration" element={ele} />
                                </div>
                    })}
                </div>
            </div>
            <div className="graph">

            </div>
        </div>
    )
}

export default Timeline