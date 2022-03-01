import React, { useContext, useEffect, useState } from 'react';
import NoteContext from '../context/noteContext';
import { useHistory } from 'react-router-dom';
export default function Form(props) {
    const a = useContext(NoteContext);
    const { notes, addNote, deleteNote, editNote, getNotes } = a;
    const [note, setnote] = useState({ title: "", description: "", tag: "" });
    const history=useHistory();
    useEffect(() => {
        if(localStorage.getItem('token')){
            getNotes();
            
        }
        else{
            props.showAlert("you need to login first","danger")
            history.push("/Login")
        }
        //eslint-disable-next-line
    }, []);
const onChangeHandle = (e) => {

    setnote({ ...note, [e.target.name]: e.target.value })

}
const onSubmitHandle = (e) => {
    e.preventDefault()

    addNote(note.title, note.description, note.tag);
    props.showAlert("note added successfully","success")
    setnote({ title: "", description: "", tag: "" });
}
    return <>
        <form className='my-3' onSubmit={onSubmitHandle}>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                <input type="text" className="form-control" id="title" name="title" value={note.title} onChange={onChangeHandle} placeholder='Enter title' />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChangeHandle} placeholder='Enter description' />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Tag</label>
                <input type="text" className="form-control" name="tag" id="tag" value={note.tag} onChange={onChangeHandle} placeholder='Enter tag' />
            </div>

            <button type="submit" className="btn btn-primary">Add Note</button>
        </form>
    </>;
}
