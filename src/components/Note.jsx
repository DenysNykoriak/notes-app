import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editNote } from '../store/actions/noteActions';

export default function Note({note, deleteFn, ...props}) {

    const [noteText, setNoteText] = useState(note.text);
    const [oldNoteText, setOldNoteText] = useState(note.text);

    const [editing, setEditing] = useState(false);

    const dispatch = useDispatch();

    const confirmFn = () => {
        if(noteText.length === 0) return;

        dispatch(editNote(note.id, noteText));

        setEditing(false);

        setOldNoteText(noteText);
    }

    return (
        <div className="notes__note">
            {editing ? 
                <textarea
                    className="notes__form-input"
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                /> 
                :
                <span className="notes__note-text">
                    {oldNoteText}
                </span>
            }
            
            {editing ? 
                <div className="notes__note-buttons">
                    <button 
                        className="notes__form-button"
                        onClick={confirmFn}
                    >Confirm</button>
                    <button 
                        className="notes__note-delete-buttton" 
                        onClick={() => setEditing(false)}
                    >Cancel</button>
                </div> 
                :
                <div className="notes__note-buttons">
                    <button 
                        className="notes__form-button"
                        onClick={() => setEditing(true)}
                    >Edit</button>
                    <button className="notes__note-delete-buttton" onClick={deleteFn}>Delete</button>
                </div>
            }
        </div>
    )
}
