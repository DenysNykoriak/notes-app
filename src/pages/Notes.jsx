import React, { useState } from 'react';
import '../styles/Notes.css';
import Note from '../components/Note.jsx';
import { useDispatch } from 'react-redux';
import { createNote, deleteNote, getNotes } from '../store/actions/noteActions.js';
import { useKeyPress } from '../hooks/useKeyPress.js';

import notesIcon from '../assets/img/notesIcon.png';
import { useNotes } from '../hooks/useNotes';

export default function Notes() {

    const dispatch = useDispatch();

    const [notes, setNotes] = useState(dispatch(getNotes()));

    const filtredNotes = useNotes(notes);

    const todayNotes = filtredNotes.today;
    const yesterdayNotes = filtredNotes.yesterday;
    const weekNotes = filtredNotes.week;
    const otherNotes = filtredNotes.other;

    const [addInput, setAddInput] = useState('');

    const addNote = () => {
        if(addInput.length === 0) return;
        let newNotes = dispatch(createNote(notes.length, addInput));
        setAddInput('');

        setNotes(newNotes);
    }

    const removeNote = (id) => {
        if(id === undefined) return;

        let newNotes = dispatch(deleteNote(id));
        setNotes(newNotes);
    }

    const enterPress = useKeyPress('Enter', true);
    if(enterPress) addNote();

    return (
        <div className="notes">
            <div className="notes__container">
                <div className="notes__transparent-backgroud">
                    <div className="notes__info">
                        <h1 className="notes__title">Notes</h1>
                        <div className="notes__icons">
                            <div className="notes__icon-div">
                                <img className="notes__icon" src={notesIcon} alt="Notes" width="16px" height="16px"/>
                                <span className="notes__icon-span">{notes.length}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="notes__white-background">
                    <form className="notes__form">
                        <input 
                            className="notes__form-input" 
                            value={addInput} 
                            onChange={(e) => setAddInput(e.target.value)}
                            placeholder="Write new note here..."
                        />
                        <button 
                            className="notes__form-button"
                            onClick={(e) => {
                                e.preventDefault();
                                addNote();
                            }}
                        >Create Note</button>
                    </form>
                    <div className="notes__dates dates">
                        {todayNotes.length > 0 ?
                        <div className="dates__date">
                            <h3 className="date-name">Today</h3>
                            <div className="notes__items">
                                {todayNotes.map(note => <Note deleteFn={() => removeNote(note.id)} key={note.id} note={note}/>)}
                            </div>
                        </div> : ''}

                        {yesterdayNotes.length > 0 ?
                        <div className="dates__date">
                            <h3 className="date-name">Yesterday</h3>
                            <div className="notes__items">
                                {yesterdayNotes.map(note => <Note deleteFn={() => removeNote(note.id)} key={note.id} note={note}/>)}
                            </div>
                        </div> : ''}

                        {weekNotes.length > 0 ?
                        <div className="dates__date">
                            <h3 className="date-name">Last 7 days</h3>
                            <div className="notes__items">
                                {weekNotes.map(note => <Note deleteFn={() => removeNote(note.id)} key={note.id} note={note}/>)}
                            </div>
                        </div> : ''}

                        {otherNotes.length > 0 ?
                        <div className="dates__date">
                            <h3 className="date-name">Later 7 days</h3>
                            <div className="notes__items">
                                {otherNotes.map(note => <Note deleteFn={() => removeNote(note.id)} key={note.id} note={note}/>)}
                            </div>
                        </div> : ''}
                    </div>
                </div>
            </div>
        </div>
    )
}
