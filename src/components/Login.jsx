import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
export default function Login(props) {
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    let history=useHistory()
    
        const onSubmitHandler=async (e)=>{
            e.preventDefault()
            const response = await fetch("http://localhost:5000/api/login", {
              method: 'POST',
              // mode: 'cors',
              headers: {
                'Content-Type': 'application/json',
              },
              referrerPolicy: 'no-referrer', 
              body:JSON.stringify({username:email,password:password})
            });
            const json=await response.json();
            console.log(json);   
            if(json.success){
              //save the token and redirect
              localStorage.setItem('token',json.token)
              history.push('/Home')
              props.showAlert("Logged In Successfully","success")
            }
            else{
              props.showAlert("Invalid credentials","danger")
            }
    }
  return <div>
       <form className='container my-2' onSubmit={onSubmitHandler}>
         <h1>Login</h1>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onInput={(e)=>{setemail(e.target.value)}} autoComplete="off" required/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" value={password} onInput={(e)=>{setpassword(e.target.value)}} autoComplete="off" required/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
  </div>;
}
