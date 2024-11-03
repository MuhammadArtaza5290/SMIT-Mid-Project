import React,{useState} from 'react';
// import * as React from 'react';
import TextField from '@mui/material/TextField';
import {useDispatch} from "react-redux"
import { signup } from '../../store/slices/authSlice';
import "./Signup.css"
function Signup() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [gender, setGender] = useState('');

  const handleSignUp = ()=>{
      let user ={
          email,
          password,
          name,
          phone,
          address,
          gender
      }
      // console.log("signup clicked", user);
      dispatch(signup(user));
      setEmail("");
      setPassword("");
      setName("");
      setPhone("");
      setAddress("");
      setGender("");
  }

  return (
    <>

    <div className="signup-container">
      <h2 style={{textAlign:'center', marginBottom: '15px'}}>Sign Up</h2>
            <TextField
                id="email-input"
                label="Email"
                variant="outlined"
                onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
                id="password-input"
                label="Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
            />
            <TextField
                id="name-input"
                label="Name"
                variant="outlined"
                onChange={(e) => setName(e.target.value)}
            />
            <TextField
                id="phone-input"
                label="Phone"
                variant="outlined"
                onChange={(e) => setPhone(e.target.value)}
            />
            <TextField
                id="address-input"
                label="Address"
                variant="outlined"
                onChange={(e) => setAddress(e.target.value)}
            />
            <div>
                <label htmlFor="male">Male</label>
                <input
                    type="radio"
                    name="gender"
                    value="male"
                    onChange={() => setGender("male")}
                />
                <label htmlFor="female">Female</label>
                <input
                    type="radio"
                    name="gender"
                    value="female"
                    onChange={() => setGender("female")}
                />
            </div>
            <button onClick={handleSignUp}>Signup</button>
        </div>
    </>
  )
}

export default Signup