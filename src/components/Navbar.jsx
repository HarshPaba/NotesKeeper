import React, { useEffect } from 'react'
import { Link,useHistory } from "react-router-dom"
export default function Navbar(props) {
  const history=useHistory()
  const onLogout=()=>{
    
    localStorage.clear();
    // history.push('/Login')
    window.location.pathname="/Login"
  }
  useEffect(() => {
    
  }, [])
  
  return (
    <>
    <nav className="navbar navbar-dark bg-dark">
  <div className="container-fluid">
    <div className=' d-flex justify-content-start'>
    <Link className="navbar-brand" to="/">NoteKeeper</Link>
    <Link className="navbar-brand text-muted" to={`/${props.home}`}>Your Notes</Link>
    </div>
    
    <div className='d-flex justify-content-end'>
    {!localStorage.getItem("token")?(<form className=" d-md-flex justify-content-md-end ">
          <Link className="nav-link" to={`/${props.signup}`}><button className="btn btn-primary" type="button">{props.signup}</button></Link>
          <Link className="nav-link" to={`/${props.login}`}><button className="btn btn-primary" type="button">{props.login}</button></Link>
          </form>):(<button className="btn btn-primary" type="button" onClick={onLogout}>Logout</button>)}
    </div>
  </div>
</nav> 
    </>
  )
}

