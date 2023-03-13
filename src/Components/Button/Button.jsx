import './Button.css'
import '../../Effects/ripple/rippler.css'
import { BsPlayFill, BsFillTagsFill, BsPauseFill } from 'react-icons/bs'
import { FaStop } from 'react-icons/fa'
import { MdNoteAdd } from 'react-icons/md'
import addRippleEffect from '../../Effects/ripple/rippler';


function Button({type, stateChange, element=undefined}){
    return (
        <div className='button pointer status-buttons' id={`button-${type}`} onClick={stateChange} >
            <div className="button dummy" onMouseEnter={addRippleEffect} onClick={addRippleEffect} ></div>
            {(type=="play" && <BsPlayFill style={{transform:"scale(1.75)"}} />)
            || (type=="pause" && <BsPauseFill style={{transform:"scale(1.75)"}} />)
            || (type=="comment" && <MdNoteAdd style={{transform:"scale(1.4)"}}/>)
            || (type=="stop" && <FaStop style={{transform:"scale(1)"}}/>)
            || ((type=="duration" || type=="graph") && element)}
        </div>
    )
}

export default Button;