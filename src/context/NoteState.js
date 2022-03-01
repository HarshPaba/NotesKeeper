import react from "react";
import { useState } from "react";
import  NoteContext  from "./noteContext";
const NoteState=(props)=>{
    const notesInitial=[]
    const [notes, setnotes] = useState(notesInitial);
    //fetch all notes from db
    const getNotes = async () => {
        // API Call 
        const response = await fetch("http://localhost:5000/api/notes/getnotes", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            "auth-token": localStorage.getItem('token')
          }
        });
        const json = await response.json() 
        setnotes(json)
      }
      //add note to db
      //to see added note on db we use getNotes() and useEffect
    const addNote=async (title,description,tag)=>{
        
              const response = await fetch('http://localhost:5000/api/notes/addnote', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
              },             
              referrerPolicy: 'no-referrer', 
              body:JSON.stringify({title,description,tag})
            });
        
        console.log("note add");
        const note = await response.json();
        setnotes(notes.concat(note))
    }

    const deleteNote=async (id)=>{
        console.log("note del");
        const response = await fetch(`http://localhost:5000/api/notes/deletenote/${id}`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
              },             
              referrerPolicy: 'no-referrer'
            });
            const json=await response.json()
            const newNotes = notes.filter((note) => { return note._id !== id })
            setnotes(newNotes)
    }
    const editNote=async (id,title,description,tag)=>{
        console.log("note edit");
        const response = await fetch(`http://localhost:5000/api/notes/updatenote/${id}`,{
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            "auth-token": localStorage.getItem('token')
          },             
          referrerPolicy: 'no-referrer',
          body:JSON.stringify({title,description,tag})
        });
        const note = await response.json();
        setnotes(notes.concat(note))
    }
    
    return(
        <NoteContext.Provider value={{notes,addNote,deleteNote,editNote,getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState


