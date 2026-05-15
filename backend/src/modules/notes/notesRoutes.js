const express = require("express");

const router = express.Router();

const protect = require("../../middleware/authMiddleware");

const {
  createNote,
  getNotes,
  getNoteById,
  updateNote,
  deleteNote,
} = require("./notesController");


// Protected Routes
router.post("/", protect, createNote);

router.get("/", protect, getNotes);

router.get("/:id", protect, getNoteById);

router.put("/:id", protect, updateNote);

router.delete("/:id", protect, deleteNote);


module.exports = router;