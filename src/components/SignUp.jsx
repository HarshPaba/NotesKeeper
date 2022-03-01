import React,{useState} from 'react';
import {useHistory} from 'react-router-dom';

export default function SignUp (props) {
  const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [cpassword, setcpassword] = useState('');
    let history=useHistory()
        

        const onSubmitHandler=async (e)=>{
            e.preventDefault()
            if(password!==cpassword){
              props.showAlert("passwords dont match","danger")
            }
            else{
            const response = await fetch("http://localhost:5000/api/register", {
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
            if(json.success===true){
              //save the token and redirect
              localStorage.setItem('token',json.token)
              history.push('/Login')
              props.showAlert("Signed In Successfully","success")
              
            }
            else if(json.success==="already"){
              props.showAlert("username already exists","danger")
              setemail('')
              setpassword('')
              setcpassword('')
            }
            else{
              props.showAlert("Invalid credentials","danger")
            }
          }
    }
  return <div>
    <form className='container my-2' onSubmit={onSubmitHandler}>
      <h1>Sign Up</h1>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onInput={(e) => { setemail(e.target.value) }} autoComplete="off" required />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
        <input type="password" className="form-control" id="exampleInputPassword1" value={password} onInput={(e) => { setpassword(e.target.value) }} autoComplete="off" minLength={5} required />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword2" className="form-label">Confirm Password</label>
        <input type="password" className="form-control" id="exampleInputPassword2" value={cpassword} onInput={(e) => { setcpassword(e.target.value) }} autoComplete="off" minLength={5} required />
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  </div>;
}
