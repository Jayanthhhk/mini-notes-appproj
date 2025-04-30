const express = require('express');
const router = express.Router();
const Note = require('../models/Note');

// POST - Create a new note
router.post('/', async (req, res) => {
  try {
    const { title, content } = req.body;
    const newNote = new Note({
      title,
      content,
      createdAt: new Date(),
    });

    await newNote.save();
    res.status(201).json(newNote); // Return the added note
  } catch (err) {
    res.status(400).json({ message: 'Error adding note' });
  }
});

// GET - Fetch all notes (sorted by createdAt descending)
router.get('/', async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching notes' });
  }
});

// DELETE - Delete a specific note
router.delete('/:id', async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.json({ message: 'Note deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting note' });
  }
});

module.exports = router;
