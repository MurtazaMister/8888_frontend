import axios from 'axios';
import { useContext, useState } from 'react';
import UserContext from '../../Contexts/UserContext';
import './LoginPage.css'

function LoginPage(){

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const {user, setUser} = useContext(UserContext);

    const handleLogin = async (e)=>{
        e.preventDefault();

        try {
            const response = await axios.post(`${import.meta.env.VITE_APP_SERVER}/Users/Verify/${username}`, password,{
                headers:{
                    'Content-Type':'application/json'
                }
            });
            localStorage.setItem('_8888',response.data.id)
            setUser(response.data.id)
        } catch (error) {
            console.log("errorrrrr")
        }
    }

    return (
        <div className="login-body">
            <div className="header">
                Login
            </div>
            <div className="form">
                <form onSubmit={handleLogin}>
                    <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" name="username" id="username" />
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" />
                    <input type="submit" value="Submit" />
                </form>
            </div>
        </div>
    )

}

export default LoginPage;