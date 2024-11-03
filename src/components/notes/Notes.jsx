import { useState,useEffect } from "react";
import * as React from 'react';
import {useDispatch , useSelector} from 'react-redux'
import { createNote, updateNote } from "../../store/slices/noteSlice";
import "./Notes.css"
import TextField from "@mui/material/TextField"; 
// import Navbar from "../navbar/Navbar";
function Notes() {
    const dispatch = useDispatch();
    const note = useSelector(state => state.noteSlice.updateNote);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [subject, setSubject] = useState('');
    // const [createdBy, setCreatedBy] = useState('');
    // const [updatedAt, setUpdatedAt] = useState('');
     
    useEffect(() => {
      if (note) {
        setTitle(note.title);
        setContent(note.content);
        setSubject(note.subject);
      }else{
        setTitle('')
        setContent('')
        setSubject('')
      }
    }, [note])
    
      

    const handleSubmit = () => {
       const noteData={
        title,
        content,
        subject,
        // createdBy: createdBy,
        // updatedAt: updatedAt,
       }
    //    console.log("notes",noteData);
    //    dispatch(createNote(note))
       if (note) {
        dispatch(updateNote({...noteData, id:note.id}))
        return
       } else {
        dispatch(createNote(noteData))        
       }
    }
  return (
    <div className="create-notes-container">
            <h2>Create Notes</h2>
            <TextField
                id="outlined-basic"
                value={title}
                label="Title"
                variant="outlined"
                onChange={(e) => setTitle(e.target.value)}
            /><br />
            <TextField
                id="outlined-basic"
                value={content}
                label="Content"
                variant="outlined"
                onChange={(e) => setContent(e.target.value)}
                multiline
                rows={6} // This gives better control for content area height
            /><br />
            <TextField
                id="outlined-basic"
                value={subject}
                label="Subject"
                variant="outlined"
                onChange={(e) => setSubject(e.target.value)}
            /><br />
            <button onClick={handleSubmit}>
                {note ? "Update Note" : "Create Note"}
            </button>
        </div>
  )
}

export default Notes