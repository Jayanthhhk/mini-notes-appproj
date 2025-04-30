import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NoteForm from './components/NoteForm';
import Note from './components/Note';
import './App.css';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all notes
  const fetchNotes = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/notes');
      setNotes(response.data); // Set notes to the state
    } catch (err) {
      console.error('Error fetching notes', err);
    }
    setLoading(false);
  };

  // Add a new note
  const addNote = async (noteData) => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/notes', noteData);
      fetchNotes(); // Refresh the notes after adding
    } catch (err) {
      console.error('Error adding note', err);
    }
    setLoading(false);
  };

  // Delete a note
  const deleteNote = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:5000/notes/${id}`);
      fetchNotes(); // Refresh notes after deleting
    } catch (err) {
      console.error('Error deleting note', err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNotes(); // Fetch notes when the component mounts
  }, []);

  return (
    <div className="App">
      <h1>Mini Notes App</h1>
      {loading && <p>Loading...</p>}
      <NoteForm addNote={addNote} />
      <ul>
        {notes.map((note) => (
          <Note key={note._id} note={note} deleteNote={deleteNote} />
        ))}
      </ul>
    </div>
  );
};

export default App;
