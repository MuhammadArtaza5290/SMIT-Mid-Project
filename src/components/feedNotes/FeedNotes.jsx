import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNotes, deleteNote, updateDocID } from '../../store/slices/noteSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import './FeedNotes.css'; // Importing the CSS file for styles
import Navbar from '../navbar/Navbar';

function FeedNotes() {
    const dispatch = useDispatch();
    const noteList = useSelector((store) => store.noteSlice.notes);

    useEffect(() => {
        dispatch(getNotes());
    }, [dispatch]);

    const handleDelete = (id) => {
        dispatch(deleteNote(id));
    };

    const handleEdit = (id) => {
        dispatch(updateDocID(id));
    };

    return (
        <>
        <Navbar/>
        <div className="feed-notes">
            <h2 className="feed-title">Your Notes</h2>
            <div className="notes-container">
                {noteList?.map((note) => (
                    <div key={note?.id} className="note-card">
                        <h3 className="note-title">{note?.title}</h3>
                        <p className="note-content">{note?.content}</p>
                        <p className="note-subject">{note?.subject}</p>
                        <div className="link-container">
                        <span className="edit-link" onClick={() => handleEdit(note.id)}>
                                <FontAwesomeIcon icon={faEdit} /> Edit
                            </span>
                            <span className="delete-link" onClick={() => handleDelete(note.id)}>
                                <FontAwesomeIcon icon={faTrash} /> Delete
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        </>
    );
}

export default FeedNotes;
