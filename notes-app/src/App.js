import React from "react"
import Sidebar from "./Components/Sidebar"
import Editor from "./Components/Editor"
import { data } from "./data"
import Split from "react-split"
import {nanoid} from "nanoid"
import './style.css';

export default function App() {
    
    const [notes, setNotes] = React.useState(
        function(){
          return JSON.parse(localStorage.getItem("notes")) // get notes from local storage if it exists or set state as an empty array
        } || []
    )
    const [currentNoteId, setCurrentNoteId] = React.useState(
        (notes[0] && notes[0].id) || ""
    )
    
    React.useEffect(() => {
        localStorage.setItem("notes", JSON.stringify(notes))
    }, [notes]) // if notes array changes, save it to local storage and convert it to string
    
    function createNewNote() {
        const newNote = {
            id: nanoid(),
            body: "# Type your markdown note's title here"
        }
        setNotes(prevNotes => [newNote, ...prevNotes])
        setCurrentNoteId(newNote.id)
    }
    
    function updateNote(text) { // this function pushes notes in which new changes have been made to the top of the sidebar
        setNotes(oldNotes => {
          const newArr = []
            oldNotes.forEach(note => {
                note.id === currentNoteId ? newArr.unshift({...note, body: text}) : newArr.push(note)
            })
            return newArr
        })
    }

    function deleteNote(event, noteId){ // this function deletes notes from the sidebar
      event.stopPropagation()
      setNotes(oldNotes => {
        const newArr = []
        oldNotes.map(note => {
            if(note.id !== noteId){
                newArr.push(note)
            }
        })
        return newArr
      })
    }
    
    function findCurrentNote() {
        return notes.find(note => {
            return note.id === currentNoteId
        }) || notes[0]
    }
    
    return (
        <main>
        {
            notes.length > 0 
            ?
            <Split 
                sizes={[30, 70]} 
                direction="horizontal" 
                className="split"
            >
                <Sidebar
                    notes={notes}
                    currentNote={findCurrentNote()}
                    setCurrentNoteId={setCurrentNoteId}
                    newNote={createNewNote}
                    del = {deleteNote}
                />
                {
                    currentNoteId && 
                    notes.length > 0 &&
                    <Editor 
                        currentNote={findCurrentNote()} 
                        updateNote={updateNote} 
                    />
                }
            </Split>
            :
            <div className="no-notes">
                <h1 className = "no-note-title">You have no notes</h1>
                <button 
                    className="first-note" 
                    onClick={createNewNote}
                >
                    Create one now
                </button>
            </div>
            
        }
        </main>
    )
}
