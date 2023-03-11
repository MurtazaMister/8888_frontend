import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import UserContext from '../../Contexts/UserContext';
import Clock from '../../Components/Clock/Clock';
import StatusContext from '../../Contexts/StatusContext';
import TimeContext from '../../Contexts/TimeContext';
import './LoginPage.css'

function LoginPage(){

    useEffect(()=>{
        setTimeout(()=>{
            document.querySelector('.login-body').style.height = "50%"
            setTimeout(()=>{
                document.querySelector('.form-holder').style.width = "65%"
                setPlay_Pause('pause')
            },1000)
        },1000)
    },[])

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [invalid, setInvalid] = useState(false);
    const {setUser} = useContext(UserContext);
    const {setPlay_Pause} = useContext(StatusContext);
    const {setTime, timer, setDegree} = useContext(TimeContext);

    function stopper(e){
        clearTimeout(timer)
        setDegree(0);
        setTime(0);
        setPlay_Pause('play')
        document.querySelectorAll('.hand:not(#hand)').forEach((ele)=>{
            ele.remove();
        })
    }

    const handleLogin = async (e)=>{
        e.preventDefault();
        setInvalid(false);
        try {
            const response = await axios.post(`${import.meta.env.VITE_APP_SERVER}/Users/Verify/${username}`, password,{
                headers:{
                    'Content-Type':'application/json'
                }
            });
            localStorage.setItem('_8888',response.data.id)
            
            stopper()

            setUser(response.data.id)

        } catch (error) {
            setInvalid(true);
        }
    }

    return (
        <div className="login-body">
            <div className="login-clock-holder" style={{transform: "scale(0.7)", }}>
                <Clock display={false}/>
            </div>
            <div className='form-holder'>
                <div className="header" style={{color:invalid?"red":"black"}}>
                    Login
                </div>
                <div className="form">
                    <form onSubmit={handleLogin}>
                        <div className='form-element'>
                            <label htmlFor="username">Username</label>
                            <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" name="username" id="username" />
                        </div>
                        <div className="form-element">
                            <label htmlFor="password">Password</label>
                            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" />
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

export default LoginPage;