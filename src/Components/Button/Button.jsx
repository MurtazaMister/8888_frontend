import './Button.css'
import '../../Effects/ripple/rippler.css'
import { BsPlayFill, BsFillTagsFill } from 'react-icons/bs'
import addRippleEffect from '../../Effects/ripple/rippler';


function Button({type}){
    
    function stateChange(e ,type){
        console.log(type);
    }

    return (
        <div className='button pointer' onClick={(e) => stateChange(e, type) } >
            <div className="button dummy" onMouseEnter={addRippleEffect} onClick={addRippleEffect} ></div>
            {type=="play" && <BsPlayFill style={{transform:"scale(1.75)"}} />}
            {type=="tag" && <BsFillTagsFill style={{transform:"scale(1.25)"}}/>}
        </div>
    )
}

export default Button;