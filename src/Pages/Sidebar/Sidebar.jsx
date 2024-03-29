import './Sidebar.css'
import { BiStopwatch, BiPurchaseTag } from 'react-icons/bi'
import { TbTimeline } from 'react-icons/tb'
import { FiLogOut } from 'react-icons/fi'
import { NavLink, useNavigate } from 'react-router-dom'
import ColorBox from '../../Components/ColorBox/ColorBox'

import { BsFillTagsFill } from 'react-icons/bs'
import { useContext, useEffect } from 'react'
import UserContext from '../../Contexts/UserContext'
import TagContext from '../../Contexts/TagContext'
import StatusContext from '../../Contexts/StatusContext'
import { FaRegTrashAlt } from 'react-icons/fa'
import axios from 'axios'

function Sidebar({type}){
    
    const {user, setUser} = useContext(UserContext);
    const {tags, setTags, selectedTags, setSelectedTags, dragged, setDragged} = useContext(TagContext);
    const {play_pause} = useContext(StatusContext);
    const navigate = useNavigate();

    function tagSelector(index){

        if(play_pause == 'pause' && tags[index]?.selected && selectedTags.length==1){
            return;
        }

        setTags(tags.map((tag,idx)=>{
            if(idx==index){
                tag.selected = !tag.selected;
            }
            return tag;
        }))
        if(tags[index].selected){
            setSelectedTags([...selectedTags, tags[index]])
            document.getElementsByClassName('sidebar')[1].style.width = null;
        }
        else{
            setSelectedTags(selectedTags.filter(selectedTag => selectedTag.id!=tags[index].id))
        }
    }

    const dragStarted = (e, id) => {
        setDragged(id);
    }

    const draggedOver = (e)=>{
        e.preventDefault()
        e.stopPropagation();
        e.dataTransfer.dropEffect = 'move';
        e.target.style.background = 'red'
    }

    const backgroundHandler = (e)=>{
        e.stopPropagation();
        e.preventDefault();
        let ele = ['LI', 'DIV', 'SVG', 'PATH']
        let index;
        ele.forEach((child, idx) => {
            if(child == e.target.tagName){
                index = idx;
            }
        });
        switch (index) {
            case 0:
                e.target.style.background = 'transparent'
                e.target = e.target.childNodes[0]
            case 1:
                e.target.style.background = 'transparent'
                e.target = e.target.childNodes[0]
            case 2:
                e.target.style.background = 'transparent'
                e.target = e.target.childNodes[0]
            case 3:
                e.target.style.background = 'transparent'
                e.target = e.target.childNodes[0]
            default:
                break;
        }
    }

    const deleteTag = (e)=>{
        const response = axios.delete(`${import.meta.env.VITE_APP_SERVER}/Tags/${dragged}`);
        setTags(tags.filter((tag)=>tag.id!=dragged));
        setSelectedTags(selectedTags.filter((tag)=>tag.id!=dragged));
    }

    const dragDropped = (e)=>{
        e.stopPropagation();
        e.preventDefault();
        deleteTag(e);
        backgroundHandler(e);
    }

    const logoutAction = (e)=>{
        e.preventDefault();
        localStorage.clear('_8888');
        setUser(null);
        navigate('/signup',{replace: true})
    }

    return(
        <div className='body'>
            <div style={{width:"100%"}}>
            {type=='menu' && <div className='header d-flex align-items-center'>
                <div className='titles brand'>88:88</div>
                <div className="pointer">
                    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="0.5em" width="1em" xmlns="http://www.w3.org/2000/svg">
                        <line x1="3" y1="12" x2="21" y2="12"></line>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <line x1="3" y1="18" x2="21" y2="18"></line>
                    </svg>
                </div>
            </div>}

            {type=='tag' && <div className='header d-flex align-items-center'>
                <div className='titles brand'>Tags</div>
                <div className="pointer">
                        <BsFillTagsFill size={25} />
                </div>
            </div>}

            {type=='menu' && <ul className='list'>
                <li>
                    <NavLink exact="true" activeclassname="active" to="/">
                        <div className='titles-div'>
                            <BiStopwatch /> <span className="titles">Timer</span>
                        </div>
                    </NavLink>
                </li>
                <li>
                    <NavLink activeclassname="active" to="/tags">
                    <div className='titles-div'>
                        <BiPurchaseTag /> <span className="titles">Tags</span>
                    </div>
                    </NavLink>
                </li>
                <li>
                    <NavLink activeclassname="active" to="/timeline">
                    <div className='titles-div'>
                        <TbTimeline /> <span className="titles">Timeline</span>
                    </div>
                    </NavLink>
                </li>
                <li>
                    {user!=null && <NavLink activeclassname="active" to="/signup" onClick={logoutAction}>
                    <div className='titles-div'>
                        <FiLogOut /> <span className="titles">Logout</span>
                    </div>
                    </NavLink>}
                </li>
            </ul>}
            
            {type=='tag' && user==null && <ul className='list tag-list'>
                <li className='tag-li'>
                    <div className='tag-titles-div'>
                        <ColorBox color="red" /> <span className="titles">Education</span>
                    </div>
                </li>
                <li className='tag-li'>
                    <div className='tag-titles-div'>
                        <ColorBox color="blue" /> <span className="titles">Health</span>
                    </div>
                </li>
                <li className='tag-li'>
                    <div className='tag-titles-div'>
                        <ColorBox color="tomato" /> <span className="titles">Career</span>
                    </div>
                </li>
                <li className='tag-li'>
                    <div className='tag-titles-div'>
                        <ColorBox color="silver" /> <span className="titles">Fitness</span>
                    </div>
                </li>
            </ul>}

            {type=='tag' && user!=null && <ul className='list tag-list'>
                {tags.map((tag, idx)=>(
                    <li className='tag-li' key={idx} onClick={()=>tagSelector(idx)}>
                        <div draggable="true" onDragStart={(e)=>{dragStarted(e, tag.id)}} style={{color:tag?.selected?'black':'white', background:tag?.selected?'var(--theme-0)':'black'}} className='tag-titles-div'>
                            <ColorBox color={tag.color} /> <span className="titles">{tag.name.substr(0,9)}{tag.name.length>9?'..':''}</span>
                        </div>
                    </li>
                ))}
            </ul>}
            </div>
            {type=='tag' && 
                <li className='tag-li deleteArea' onDragLeave={backgroundHandler} onDragOver={draggedOver} onDrop={dragDropped}>
                    <div>
                        <FaRegTrashAlt style={{transform: "scale(1.15)"}} />
                    </div>
                </li>
            }
        </div>
    )
}

export default Sidebar