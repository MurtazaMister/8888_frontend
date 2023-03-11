import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import UserContext from '../../Contexts/UserContext';
import Clock from '../../Components/Clock/Clock';
import StatusContext from '../../Contexts/StatusContext';
import TimeContext from '../../Contexts/TimeContext';
import './TagPage.css'
import { Link, useNavigate } from 'react-router-dom';
import {SketchPicker} from 'react-color';

import 'react-color-picker/index.css'

function TagPage(){

    useEffect(()=>{
        setTimeout(()=>{
            document.querySelector('.tag-body').style.height = "50%"
            setTimeout(()=>{
                // document.querySelector('.form-holder').style.width = "65%"
                setPlay_Pause('pause')
            },1000)
        },1000)
    },[])

    onClick = () => {
          setShowPicker(showPicker)
    };
 
    onClose = () => {
      this.setState({ 
        showPicker: false 
      })
    };
 
    onChange = (color) => {
        this.setState({ 
          color: color.rgb 
        })
    };

    const [name, setName] = useState("");
    const [color, setColor] = useState({
        r: '225',
        g: '155',
        b: '99',
        a: '2'
    });
    
    const [invalid, setInvalid] = useState(false);
    const {user, setUser} = useContext(UserContext);
    const navigate = useNavigate()
    const [showPicker, setShowPicker] = useState(false)

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

    onClick = () => {
        this.setState({ 
          showPicker: !this.state.showPicker 
        })
    };
 
    onClose = () => {
      this.setState({ 
        showPicker: false 
      })
    };
 
    onChange = (color) => {
        this.setState({ 
          color: color.rgb 
        })
    };

    const styles = reactCSS({
        'default': {
          color: {
            width: '40px',
            height: '15px',
            borderRadius: '3px',
            background: `rgba(${ this.state.color.r }, ${ this.state.color.g }, ${ this.state.color.b }, ${ this.state.color.a })`,
          },
          popover: {
            position: 'absolute',
            zIndex: '3',
          },
          cover: {
            position: 'fixed',
            top: '0px',
            right: '0px',
            bottom: '0px',
            left: '0px',
          },
          swatch: {
            padding: '6px',
            background: '#ffffff',
            borderRadius: '2px',
            cursor: 'pointer',
            display: 'inline-block',
            boxShadow: '0 0 0 1px rgba(0,0,0,.2)',
          },          
        },
      });

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
                        <div className='form-element'>
                        <div>
                            <div style={ styles.swatch } onClick={ onClick }>
                                <div style={ styles.color } />
                            </div>
                            { this.state.showPicker ? <div style={ styles.popover }>
                                <div style={ styles.cover } onClick={ this.onClose }/>
                                <SketchPicker color={ this.state.color } onChange={ this.onChange } />
                            </div> : null }
                    
                            </div>
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