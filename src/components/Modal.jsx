import React, { useContext, useEffect, useState } from 'react';
import NoteContext from '../context/noteContext';

export default function Modal(props) {
    const a = useContext(NoteContext);
    const { notes, addNote, deleteNote, editNote, getNotes } = a;
    const [note, setnote] = useState({ title: props.otitle, description: props.odescription, tag: props.otag });
    
    const onChangeHandle = (e) => {

        setnote({ ...note, [e.target.name]: e.target.value })

    }
        useEffect(() => {
            getNotes();
            //eslint-disable-next-line
        }, []);
    const onSubmitHandle = (e) => {
        e.preventDefault()

        editNote(props.key,note.title, note.description, note.tag);
        // setnote({ title: "", description: "", tag: "" });
    }
    return <>
        {/* <!-- Button trigger modal --> */}
        <i className="fas fa-edit mx-3" data-bs-toggle="modal" data-bs-target="#staticBackdrop" ></i>

        {/* <!-- Modal --> */}
        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">

            <form className="modal-dialog" onSubmit={onSubmitHandle}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">Update Notes</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <label htmlFor="modalTitle" className="form-label">Title</label>
                            <input type="text" className="form-control" name="title" id="title" value={note.title} onChange={onChangeHandle} aria-describedby="emailHelp" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="modalDescription" className="form-label">Description</label>
                            <input type="text" className="form-control" name="description" id="description" value={note.description} onChange={onChangeHandle} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="modalTag" className="form-label">Tag</label>
                            <input type="text" className="form-control" name="tag" id="tag" value={note.tag} onChange={onChangeHandle}  />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Submit</button>
                    </div>
                </div>
            </form>
        </div>
    </>
}
