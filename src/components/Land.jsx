import React from 'react'
import "../index.css"
import { Link } from 'react-router-dom'
const Land = () => {
  return (
    <div className='container text-center my-4'>
        <h1 >Tame your work, organize your life.</h1>
        <h4 className='my-3 text-muted'>Remember everything and tackle any project with your notes all in one place.</h4>
        <Link to="/SignUp"><button className='btn btn-primary my-3'>Sign Up for free</button></Link> <br />
        <Link to="/LogIn">Already have an account?LogIn</Link>
    </div>
  )
}

export default Land