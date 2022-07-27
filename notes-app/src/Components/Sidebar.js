import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTrashCan } from '@fortawesome/free-solid-svg-icons'


export default function Sidebar(props) {
    const noteElements = props.notes.map((note, index) => (
        <div key={note.id}>
            <div
                
                className={`title ${
                    note.id === props.currentNote.id ? "selected-note" : ""
                }`}
                onClick={() => props.setCurrentNoteId(note.id)}
            >
                <h4 className="text-snippet">{note.body.split("\n")[0].slice(2)}</h4>
                <button 
                    className="delete-btn"
                    onClick={(event) => props.del(event, note.id)}
                >
                    <FontAwesomeIcon className = "fa-trash trash-icon" icon = {faTrashCan}></FontAwesomeIcon>
                </button>
            </div>
        </div>
    ))

    return (
        <section className="pane sidebar">
            <div className="sidebar--header">
                <h3>Note History</h3>
                <button className="new-note" onClick={props.newNote}>+</button>
            </div>
            {noteElements}
        </section>
    )
}