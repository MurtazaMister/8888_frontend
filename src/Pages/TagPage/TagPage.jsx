import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import UserContext from '../../Contexts/UserContext';
import Clock from '../../Components/Clock/Clock';
import StatusContext from '../../Contexts/StatusContext';
import TimeContext from '../../Contexts/TimeContext';
import './TagPage.css'
import { Link, useNavigate } from 'react-router-dom';
import ColorPicker from '../../Components/ColorPicker/ColorPicker';

function TagPage(){

    useEffect(()=>{
        setTimeout(()=>{
            document.querySelector('.tag-body').style.height = "50%"
        },1000)
    },[])

    const [name, setName] = useState("");
    const [color, setColor] = useState({
      r: '225',
      g: '155',
      b: '99',
      a: '2',
    })
    
    const [invalid, setInvalid] = useState(false);
    const {user, setUser} = useContext(UserContext);
    const navigate = useNavigate()

    const handleTag = async (e)=>{
        e.preventDefault();
        setInvalid(false);
        try {
            const response = await axios.post(`${import.meta.env.VITE_APP_SERVER}/Tags`, {
                "name": name,
                "color": color,
                "userId": user
            },{
                headers:{
                    'Content-Type':'application/json'
                }
            });
            console.log(response);

        } catch (error) {
            setInvalid(true);
        }
    }

    return (
        <div className="tag-body">
            <div className='form-holder'>
                <div className="header" style={{color:invalid?"red":"black"}}>
                    Add a new Tag
                </div>
                <div className="form">
                    <form onSubmit={handleTag}>
                        <div className='form-element'>
                            <label htmlFor="name">Name</label>
                            <input value={name} onChange={(e) => setName(e.target.value)} type="text" name="name" id="name" />
                        </div>
                        <div className='form-element' style={{display:"flex"}}>
                          <label htmlFor="colorPicker">Color</label>
                          <ColorPicker color={color} id="colorPicker"/>
                        </div>
                        <div className="form-element">
                            <input type="submit" value="Submit" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )

}

export default TagPage;