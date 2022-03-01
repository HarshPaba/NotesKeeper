import React, { useContext, useEffect, useState } from 'react';
import NoteContext from '../context/noteContext';
import NoteItem from './NoteItem';
import Form from './Form';
export default function Home(props) {
        const a = useContext(NoteContext);
        const { notes, addNote, deleteNote, editNote, getNotes } = a;
        
    return <div className='container'>
        
            <Form showAlert={props.showAlert} />
            <div className='row my-3'>
                <h3>Your Notes</h3>
                
                {notes.map((item) => {
                    return <NoteItem item={item} key={item._id} />
                })

                }
            </div>
        </div>
    
    
}
