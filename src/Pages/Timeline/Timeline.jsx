import {BsPieChart} from 'react-icons/bs'
import {FaRegChartBar} from 'react-icons/fa'
import {BsGraphUp} from 'react-icons/bs'
import './Timeline.css'
import {TbLetterD, TbLetterW, TbLetterM, TbLetterY} from 'react-icons/tb'
import Button from '../../Components/Button/Button'
import { useContext, useEffect, useState } from 'react'
import BarGraph from '../../Components/Graphs/Bar/BarGraph'
import { PieGraph } from '../../Components/Graphs/Pie/PieGraph'
import { LineGraph } from '../../Components/Graphs/Line/LineGraph'
import TagContext from '../../Contexts/TagContext'
import UserContext from '../../Contexts/UserContext'
import {GrCaretNext, GrCaretPrevious} from 'react-icons/gr'

function Timeline({formattedDate}){

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const [graph, setGraph] = useState('pie')
    const [duration, setDuration] = useState('daily')
    const [current, setCurrent] = useState(formattedDate())
    const [high, setHigh] = useState(formattedDate({supply:current}));
    const [low, setLow] = useState(formattedDate({supply:current}));
    const { sessions } = useContext(UserContext)
    const { tags } = useContext(TagContext);

    const graphArr = ['pie', 'bar', 'line']
    const graphIcons = [<BsPieChart />, <FaRegChartBar />, <BsGraphUp />]
    const durationArr = ['daily', 'weekly', 'monthly', 'yearly']
    const durationIcons = [<TbLetterD />, <TbLetterW />, <TbLetterM />, <TbLetterY />]

    const nameMapper = (ids)=>{
        let mapper = {};
        tags.forEach(tag => {
            mapper[tag.id] = tag.name;
        });
        return ids.map((id)=>mapper[id])
    }

    const colorMapper = (ids, backgroundColor=false)=>{
        let mapper = {};
        tags.forEach(tag => {
            mapper[tag.id] = tag.color+(backgroundColor?'C8':'FF');
        });
        return ids.map((id)=>mapper[id])
    }

    const graphChange = (e, category)=>{
        setGraph(category)
    }

    const durationChange = (e, category)=>{
        setDuration(category);
    }

    useEffect(()=>{
        if(duration=='daily'){
            setLow(current)
            setHigh(current)
        }
        if(duration=='weekly'){
            let startDate = new Date(current); 
            startDate.setDate(startDate.getDate() - startDate.getDay() + 1);
            let endDate = new Date(current); 
            endDate.setDate(endDate.getDate() + 6 - endDate.getDay() + 1);
            setLow(formattedDate({date:startDate,add:false}))
            setHigh(formattedDate({date:endDate, add:false}))
        }
        if(duration=='monthly'){
            let startDate = new Date(current); 
            startDate.setDate(1);
            let endDate = new Date(current); 
            let days_in_this_month = new Date(endDate.getFullYear(), endDate.getMonth()+1, 0).getDate();
            endDate.setDate(endDate.getDate() + days_in_this_month - endDate.getDate());
            setLow(formattedDate({date:startDate,add:false}))
            setHigh(formattedDate({date:endDate, add:false}))
        }
        if(duration=='yearly'){
            let startDate = new Date(current); 
            let endDate = new Date(current); 

            let days_in_this_year = ((Number(startDate.getFullYear()) % 4 === 0 && Number(startDate.getFullYear()) % 100 > 0) || Number(startDate.getFullYear()) %400 == 0) ? 366 : 365;
            let current_day =  Math.floor((startDate - (new Date(startDate.getFullYear(), 0, 0))) / (1000 * 60 * 60 * 24));

            startDate.setDate(startDate.getDate() - current_day + 1);
            endDate.setDate(endDate.getDate() + days_in_this_year - current_day);
            setLow(formattedDate({date:startDate,add:false}))
            setHigh(formattedDate({date:endDate, add:false}))
        }
    }, [duration, current])

    const dataAssembler = (map)=>{
        let data = {};

        // Data for Pie, Bar, Line chart - daily
        if(duration=='daily'){
            try {
                if(map[current]!=undefined){
                    map = map[current];
                    data['labels'] = nameMapper(Object.keys(map));
                    data['datasets'] = [
                        {
                            label: 'Time spent (min)',
                            data: Object.values(map).map(ele=>(Number(ele)/60).toFixed(2)),
                            backgroundColor: colorMapper(Object.keys(map),true),
                            borderColor: colorMapper(Object.keys(map)),
                            borderWidth: 1,
                        }
                    ]
                    return data;
                }
                else{
                    return null;
                }
            } catch (error) {
                return null;
            }
        }

        if(graph=='pie'){
            let lowDate = new Date(formattedDate({supply:low, add:true}));
            let highDate = new Date(formattedDate({supply:high, add:true}));
            try {
                let keyArray = Object.keys(map).filter(ele => {
                    let curDate = new Date(ele);
                    if(curDate>=lowDate && curDate<=highDate){
                        return true;
                    }
                    return false;
                });
                map = keyArray
                .reduce((obj, key) => {
                    obj[key] = map[key];
                    return obj;
                }, {});
                
                if(keyArray.length == 0){
                    return null;
                }

                // Seperated dates till this point
                // Now we need to accumulate all the tagId

                let newMap = {};
                for(let date in map){
                    for(let tagId in map[date]){
                        newMap[tagId] = newMap[tagId]?newMap[tagId]+Number(map[date][tagId]):Number(map[date][tagId])
                    }
                }
                map = newMap;

                data['labels'] = nameMapper(Object.keys(map));
                data['datasets'] = [
                    {
                        label: 'Time spent (min)',
                        data: Object.values(map).map(ele=>(Number(ele)/60).toFixed(2)),
                        backgroundColor: colorMapper(Object.keys(map),true),
                        borderColor: colorMapper(Object.keys(map)),
                        borderWidth: 1,
                    }
                ]
                return data;
            } catch (error) {
                return null;
            }
        }
        else{
            let lowDate = new Date(formattedDate({supply:low, add:true}));
            let highDate = new Date(formattedDate({supply:high, add:true}));
            try {
                let keyArray = Object.keys(map).filter(ele => {
                    let curDate = new Date(ele);
                    if(curDate>=lowDate && curDate<=highDate){
                        return true;
                    }
                    return false;
                });
                map = keyArray
                .reduce((obj, key) => {
                    obj[key] = map[key];
                    return obj;
                }, {});
                
                if(keyArray.length == 0){
                    return null;
                }

                // Seperated dates till this point
                // console.log('i m map', map);

                data['labels'] = Object.keys(map).map(ele=>ele.slice(0,10));

                data['datasets'] = [];
                let innerLabels = new Set();
                // console.log('i m data', data);
                for(let dates in map){
                    for(let tagId in map[dates]){
                        innerLabels.add(tagId);
                    }
                };
                innerLabels = Array.from(innerLabels);
                for(let label of innerLabels){
                    let obj = {};
                    obj['label'] = nameMapper([label])[0];
                    obj['backgroundColor'] = colorMapper([label], true)[0]
                    obj['data'] = [];
                    let isThere = false;
                    for(let date in map){
                        for(let tagId in map[date]){
                            if(tagId == label){
                                isThere = true;
                                obj['data'].push((map[date][tagId]/60).toFixed(2));
                            }
                        }
                        if(!isThere){
                            obj['data'].push(0);
                        }
                        isThere = false;
                    }
                    data['datasets'].push(obj);
                }
                
                return data;
            } catch (error) {
                return null;
            }
        }
        
    }

    const dateChanger = (day=0)=>{
        let d = new Date(current);
        if(duration=='weekly'){
            day = 7*day;
        }
        else if(duration == 'monthly'){
            let days_in_this_month = new Date(d.getFullYear(), d.getMonth()+1, 0).getDate()
            day = (day==-1)?(d.getDate()*(-1)):(days_in_this_month-d.getDate()+1);
        }
        else if(duration == 'yearly'){
            let days_in_this_year = ((Number(d.getFullYear()) % 4 === 0 && Number(d.getFullYear()) % 100 > 0) || Number(d.getFullYear()) %400 == 0) ? 366 : 365;
            let current_day =  Math.floor((d - (new Date(d.getFullYear(), 0, 0))) / (1000 * 60 * 60 * 24));
            day = (day==1)?(days_in_this_year - current_day + 1):(day*current_day)
        }
        d.setDate(d.getDate() + day);
        setCurrent(formattedDate({date:d}))
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
                <div className="timeline-date-holder">
                    <div className="timeline-navigators timeline-previous">
                        <GrCaretPrevious onClick={(e)=>{dateChanger(-1)}} />
                    </div>
                    <div className="timeline-date" style={high!=low?{'fontSize':'25px'}:{}}>
                        {high==low && (formattedDate({add:false, supply:current})+", "+days[new Date(current).getDay()])}
                        {high!=low && (formattedDate({add:false, supply:low})+", "+days[new Date(low).getDay()] +" - "+ formattedDate({add:false, supply:high})+", "+ days[new Date(high).getDay()])}
                    </div>
                    <div className="timeline-navigators timeline-next">
                        <GrCaretNext onClick={(e)=>{dateChanger(1)}} />
                    </div>
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
                <div className="graph-holder" style={graph=='pie'?{width:'500px'}:{}}>
                    {graph=='pie' && <PieGraph data={dataAssembler(sessions)} />}
                    {graph=='bar' && <BarGraph data={dataAssembler(sessions)} display={duration!='daily'} />}
                    {graph=='line' && <LineGraph data={dataAssembler(sessions)} display={duration!='daily'} />}
                </div>
            </div>
        </div>
    )
}

export default Timeline