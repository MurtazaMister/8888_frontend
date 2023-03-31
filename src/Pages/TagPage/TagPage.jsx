import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import UserContext from '../../Contexts/UserContext';
import Clock from '../../Components/Clock/Clock';
import StatusContext from '../../Contexts/StatusContext';
import TimeContext from '../../Contexts/TimeContext';
import './TagPage.css'
import { Link, useNavigate } from 'react-router-dom';
import ColorPicker from '../../Components/ColorPicker/ColorPicker';
import TagContext from '../../Contexts/TagContext';

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
    const [message, setMessage] = useState('Maximum number of tags reached, delete previous ones to add newer ones')
    const {user, setUser} = useContext(UserContext);
    const navigate = useNavigate()
    const {tags, setTags } = useContext(TagContext);

    const handleTag = async (e)=>{
        e.preventDefault();
        setInvalid(false);
        try {
            if(tags.length == 10){
                setMessage('Maximum number of tags reached, delete previous ones to add newer ones')
                setInvalid(true);
                return;
            }
            if(name.trim() == 0){
                setMessage('Please enter a proper name')
                setInvalid(true);
                return;
            }
            const response = await axios.post(`${import.meta.env.VITE_APP_SERVER}/Tags`, {
                "name": name,
                "color": '#'+color.r.toString(16).padStart(2,'0')+color.g.toString(16).padStart(2,'0')+color.b.toString(16).padStart(2,'0'),
                "userId": user
            },{
                headers:{
                    'Content-Type':'application/json'
                }
            }).then((data)=>data.data).then((data)=>{
                setTags([...tags, data])
            })

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
                {invalid && <div className="header" style={{color:invalid?"red":"black", fontSize:"17px", marginBottom:"10px"}}>
                    {message}
                </div>}
                <div className="form">
                    <form onSubmit={handleTag}>
                        <div className='form-element'>
                            <label htmlFor="name">Name</label>
                            <input value={name} onChange={(e) => setName(e.target.value)} type="text" name="name" id="name" />
                        </div>
                        <div className='form-element' style={{display:"flex"}}>
                          <label htmlFor="colorPicker">Color</label>
                          <ColorPicker color={color} setColor={setColor} id="colorPicker"/>
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