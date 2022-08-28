import { useRef, useState, useEffect } from 'react'; 
import useInput from './hooks/useInput';
import './LogIn.css'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar.js"

const LogIn = () => {

    const userRef = useRef();
    const [user, resetUser, userAttribs] = useInput('user', '')
    const [pwd, setPwd] = useState('');
    const [error, setError] = useState(null)
    const navigate = useNavigate();

    useEffect(() => {
        userRef.current.focus();
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/signin',
                btoa(JSON.stringify({ user, pwd })),
                {}
            );

            const auth_token = response.data
            resetUser();
            setPwd('');
            sessionStorage.setItem("usport_auth_token", auth_token);
            navigate("/", { replace: true, state:{auth_token:auth_token} });
        } catch (err) {
            setError(err.response.data.detail)
        }
    }


    return (
        <div>
            <Navbar></Navbar>
            <div className="login-form-wrapper">
                <div className="login-form">
                    <form onSubmit={handleSubmit}>
                        {   error ? <p>{error}</p> :
                            null
                        }
                        <div className="input-container">
                            <label>Username </label>
                            <input type="username" name="uname" ref={userRef} autoComplete="off" {...userAttribs} placeholder="Enter your username" required />
                        </div>
                        <div className="input-container">
                            <label>Password </label>
                            <input type="password" name="pass" placeholder="Enter your password" onChange={(e) => setPwd(e.target.value)} value={pwd}required />
                        </div>
                        <div className="button-container">
                            <button className="button" type="submit" >Sign in</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
      );
};
  
export default LogIn;