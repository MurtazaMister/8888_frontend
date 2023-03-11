import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import UserContext from '../../Contexts/UserContext';
import Clock from '../../Components/Clock/Clock';
import StatusContext from '../../Contexts/StatusContext';
import TimeContext from '../../Contexts/TimeContext';
import './SignupPage.css'
import { Link, useNavigate } from 'react-router-dom';

function SignupPage(){

    useEffect(()=>{
        setTimeout(()=>{
            document.querySelector('.signup-body').style.height = "50%"
            setTimeout(()=>{
                // document.querySelector('.form-holder').style.width = "65%"
                setPlay_Pause('pause')
            },1000)
        },1000)
    },[])

    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [invalid, setInvalid] = useState(false);
    const {setUser} = useContext(UserContext);
    const {setPlay_Pause} = useContext(StatusContext);
    const {setTime, timer, setDegree} = useContext(TimeContext);
    const navigate = useNavigate()

    function stopper(e){
        clearTimeout(timer)
        setDegree(0);
        setTime(0);
        setPlay_Pause('play')
        document.querySelectorAll('.hand:not(#hand)').forEach((ele)=>{
            ele.remove();
        })
    }

    const handleSignup = async (e)=>{
        e.preventDefault();
        setInvalid(false);
        try {
            const response = await axios.post(`${import.meta.env.VITE_APP_SERVER}/Users`, {
                "userName": username,
                "firstName": firstName,
                "lastName": lastName,
                "password": password
            },{
                headers:{
                    'Content-Type':'application/json'
                }
            });
            console.log(response);
            localStorage.setItem('_8888',response.data.id)
            
            stopper()

            navigate('/',{replace: true})

            setUser(response.data.id)

        } catch (error) {
            setInvalid(true);
        }
    }

    return (
        <div className="signup-body">
            <div className="signup-clock-holder" style={{transform: "scale(0.7)", }}>
                <Clock display={false}/>
            </div>
            <div className='form-holder'>
                <div className="header" style={{color:invalid?"red":"black"}}>
                    Sign Up
                </div>
                <div className="form">
                    <form onSubmit={handleSignup}>
                        <div className="form-element">
                            <Link to='/' style={{color:"#3400d5"}}>Have an account? Login now.</Link>
                        </div>
                        <div className='form-element'>
                            <label htmlFor="username">Username</label>
                            <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" name="username" id="username" />
                        </div>
                        <div className='form-element'>
                            <label htmlFor="firstName">First Name</label>
                            <input value={firstName} onChange={(e) => setFirstName(e.target.value)} type="text" name="firstName" id="firstName" />
                        </div>
                        <div className='form-element'>
                            <label htmlFor="lastName">Last Name</label>
                            <input value={lastName} onChange={(e) => setLastName(e.target.value)} type="text" name="lastName" id="lastName" />
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

export default SignupPage;