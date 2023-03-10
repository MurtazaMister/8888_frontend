import './Sidebar.css'
import { BiStopwatch, BiPurchaseTag } from 'react-icons/bi'
import { TbTimeline } from 'react-icons/tb'
import { FiInfo } from 'react-icons/fi'
import { NavLink } from 'react-router-dom'
import ColorBox from '../../Components/ColorBox/ColorBox'

import { BsFillTagsFill } from 'react-icons/bs'

function Sidebar({type}){
    return(
        <div className='body'>
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
                    <NavLink activeclassname="active" to="/about">
                    <div className='titles-div'>
                        <FiInfo /> <span className="titles">About</span>
                    </div>
                    </NavLink>
                </li>
            </ul>}
            
            {type=='tag' && <ul className='list tag-list'>
                <li className='tag-li'>
                    <div className='tag-titles-div'>
                        <ColorBox color="red" /> <span className="titles">Timer</span>
                    </div>
                </li>
                <li className='tag-li'>
                    <div className='tag-titles-div'>
                        <ColorBox color="blue" /> <span className="titles">Tags</span>
                    </div>
                </li>
                <li className='tag-li'>
                    <div className='tag-titles-div'>
                        <ColorBox color="tomato" /> <span className="titles">Timeline</span>
                    </div>
                </li>
                <li className='tag-li'>
                    <div className='tag-titles-div'>
                        <ColorBox color="silver" /> <span className="titles">About</span>
                    </div>
                </li>
            </ul>}
        </div>
    )
}

export default Sidebar