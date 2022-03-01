import './App.css';
import Navbar from './components/Navbar';
import React,{useState} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes
} from "react-router-dom";
import Home from './components/Home';
import NoteState from './context/NoteState';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Alert from './components/Alert';
import Land from './components/Land';
function App() {
  const [alert, setAlert] = useState(null);
  const [auth, setAuth] = useState(false);

  const showAlert = (message, type)=>{
      setAlert({
        msg: message,
        type: type
      })
      setTimeout(() => {
          setAlert(null);
      }, 1500);
  }
  return (
    <NoteState>
    <div className="App">
    <Router>
      <Navbar head="I-Notebook" home="Home" about="About" signup='SignUp' login='Login'/>
      <Alert alert={alert}/>
      <Switch>
        <Route exact path="/Home">
          <Home showAlert={showAlert}/>
        </Route>
        <Route exact path="/">
          <Land/>
        </Route>
        <Route exact path="/SignUp">
          <SignUp showAlert={showAlert}/>
        </Route>
        <Route exact path="/Login">
          <Login showAlert={showAlert}/>
        </Route>
      </Switch>
    </Router>
    </div>
    </NoteState>
  );
}

export default App;
