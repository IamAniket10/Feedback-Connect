import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './LoginSignup.css';
import axios from 'axios';

import user_icon from '../Assets/person.png'
import email_icon from '../Assets/email.png'
import password_icon from '../Assets/password.png'

const LoginSignup = () => {

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const [action, setAction] = useState("Sign Up");
    const navigate = useNavigate();

    axios.defaults.withCredentials= true;

    const handleFormSubmit = (event) => {
        event.preventDefault();
        axios.post('https://feedback-connect-backend.vercel.app/signup', {name, email, password})
        .then(result => {
            console.log(result);
            navigate('/login');
        })
        .catch(err => console.log(err))
    }

    const handleActionChange = (newAction) => {
        setAction(newAction);
    }

    return (
        <div className='container'>
            <div className='header'>
                <div className='text'>{action}</div>
                <div className='underline'></div>
            </div>
            <form className='inputs' onSubmit={handleFormSubmit}>
                {action === "Login" ? <div></div> :
                    <div className="input">
                        <img src={user_icon} alt="" />
                        <input type="text" placeholder='Name' 
                        onChange={(e) => setName(e.target.value)} />
                    </div>}
                <div className="input">
                    <img src={email_icon} alt="" />
                    <input type="email" placeholder='Email id' 
                    onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="input">
                    <img src={password_icon} alt="" />
                    <input type="password" placeholder='password'
                    onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type='submit' className='submit-button'>{action}</button>
            </form>
            {action === "Sign Up" ? <div></div> :
                <div className="forgot-password">Lost Password? <span>Click Here</span></div>}
            <div className="submit-container">
                <Link to="/signup" className={action === "Login" ? "submit gray" : "submit"} onClick={ () => handleActionChange("Sign Up") }>Sign Up</Link>
                <Link to="/login" className={action === "Sign Up" ? "submit gray" : "submit"} onClick={() =>  handleActionChange("Login") }>Login</Link>
            </div>
        </div>
    );
};


export default LoginSignup;

