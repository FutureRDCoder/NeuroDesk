import { useEffect, useState } from "react";

import {
  getNotes,
  createNote,
  deleteNote,
} from "../api/notesApi";


function NotesPage() {
  const [notes, setNotes] = useState([]);

  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });


  // Fetch Notes
  const fetchNotes = async () => {
    try {
      const data = await getNotes();

      setNotes(data.notes);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchNotes();
  }, []);


  // Handle Input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  // Create Note
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createNote(formData);

      setFormData({
        title: "",
        content: "",
      });

      fetchNotes();
    } catch (error) {
      console.error(error);
    }
  };


  // Delete Note
  const handleDelete = async (id) => {
    try {
      await deleteNote(id);

      fetchNotes();
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">
        Notes
      </h1>


      {/* Create Note */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow mb-8"
      >
        <input
          type="text"
          name="title"
          placeholder="Note title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg mb-4"
          required
        />

        <textarea
          name="content"
          placeholder="Write your note..."
          value={formData.content}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg mb-4 h-32"
        />

        <button
          type="submit"
          className="bg-black text-white px-6 py-3 rounded-lg"
        >
          Create Note
        </button>
      </form>


      {/* Notes List */}
      {loading ? (
        <p>Loading...</p>
      ) : notes.length === 0 ? (
        <div className="bg-white p-6 rounded-2xl shadow">
          No notes yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {notes.map((note) => (
            <div
              key={note._id}
              className="bg-white p-6 rounded-2xl shadow"
            >
              <h2 className="text-2xl font-bold mb-3">
                {note.title}
              </h2>

              <p className="text-gray-700 mb-6">
                {note.content}
              </p>

              <button
                onClick={() => handleDelete(note._id)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default NotesPage;