import React, { createContext, useState } from "react"

export const NoteContext = createContext()

export const NoteProvider = (props) => {
    const [notes, setNotes] = useState([])
    

    const getNotes = () => {
    return fetch(`http://localhost:8088/gardenNotes`)
    .then(res => res.json())
    .then(setNotes)
    }

    const addNote = noteObj => {
        return fetch("http://localhost:8088/gardenNotes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(noteObj)
        })
        .then(getNotes)
    }
    
    const getNoteById = (id) => {
        return fetch(`http://localhost:8088/gardenNotes/${id}`)
            .then(res => res.json())
    }


    const deleteNote = noteId => {
        return fetch(`http://localhost:8088/gardenNotes/${noteId}`, {
            method: "DELETE"
        })
            .then(getNotes)
    }

    const updateNote = notes => {
        return fetch(`http://localhost:8088/gardenNotes/${notes.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(notes)
        })
          .then(getNotes)
      }

   
    return (
        <NoteContext.Provider value={{
            getNotes, notes, addNote, getNoteById, 
            deleteNote, updateNote
        }}>
            {props.children}
        </NoteContext.Provider>
    )

}