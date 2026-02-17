import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { myContext } from './ContextAPI';
import {useContext} from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {
const token = localStorage.getItem("token");

    const navigate= useNavigate()
    const[email, setEmail]= useState('')
    const[password, setPassword]= useState('')
  

    const[responseMsg, setResponseMsg]= useState('')
    
    const{name,setName,loggedIn,setLoggedIn} = useContext(myContext)


   
       const handleSubmit =async(e)=>{
        e.preventDefault()
        console.log('Form submitted with:',email,password);

const payloads = {email,password}

    //    axios.post("http://localhost:4000/api/login",payloads)
       
       axios.post("https://jobportal-backend-x18f.onrender.com/api/login",payloads)
       .then((res)=>{
         //  SAVE TOKEN + USER ID HERE
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.user._id);
        setResponseMsg(res.data.message)
        setName(res.data.user.name)
        setLoggedIn(true)
        navigate('/')
       })

       .catch((err)=>
       console.log("error:", err.response || err.message))

       console.log("TOKEN FROM LOCALSTORAGE:", token);

    }
    
    return (
        <div style={{fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize:'19px', backgroundColor: '#94a09c',width:'100vw', minHeight:'100vh', margin: '0', padding: '0' }}>
            <div className="row justify-content-center">
                <div className="col-md-6 mt-5 mb-3">
                    {/* Add border, rounded corners, and padding */}
                    <div className="border p-4 rounded">
                    <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                <input 
                                    type="email" 
                                    className="form-control" 
                                    id="exampleInputEmail1" 
                                    aria-describedby="emailHelp" 
                                    onChange={(e)=>setEmail(e.target.value)} required
                                />
                                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                <input 
                                    type="password" 
                                    className="form-control" 
                                    id="exampleInputPassword1" 
                                    onChange={(e)=>{setPassword(e.target.value)}} required
                                />
                            </div>
                            <div className="mb-3 form-check">
                                <input 
                                    type="checkbox" 
                                    className="form-check-input" 
                                    id="exampleCheck1" 
                                />
                                <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>                        {responseMsg && <p>{responseMsg}</p>}
                        

                    </div>
                </div>
            </div>
        </div>
    );
};
export default Login;