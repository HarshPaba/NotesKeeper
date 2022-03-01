import React from 'react';
import NoteContext from '../context/noteContext';
import { useContext} from 'react';
import Modal from './Modal';
export default function NoteItem(props) {
    const a = useContext(NoteContext);
    const {deleteNote,editNote} = a;
    const ClickHandler=()=>{
        deleteNote(props.item._id)
        props.showAlert("note deleted successfully","success")
    }
    
    
    return <div className=" col-md-4 my-2">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{props.item.title} </h5>
                    <p className="card-text">{props.item.description}</p>
                    <h6 className="card-subtitle mb-2 text-muted"> Tag: "{props.item.tag}"</h6>
                    <i className="fas fa-trash" onClick={ClickHandler}></i>
                    <Modal
                    key={props.item._id}
                    otitle={props.item.title}
                    odescription={props.item.description}
                    otag={props.item.tag}
                    />
                </div>
            </div>
        </div>
    ;
}
