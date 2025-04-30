import React from 'react';

const Note = ({ note, deleteNote }) => {
  return (
    <li>
      <h3>{note.title}</h3>
      <p>{note.content}</p>
      <button onClick={() => deleteNote(note._id)}>Delete</button>
    </li>
  );
};

export default Note;
