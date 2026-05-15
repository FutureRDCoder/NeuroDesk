import { useEffect, useState } from "react";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import debounce from "lodash.debounce";
import { updateNote } from "../api/notesApi";

import {
  getNotes,
  createNote,
  deleteNote,
} from "../api/notesApi";

import {
  summarizeNote,
  generateTasks,
  rewriteContent,
} from "../api/aiApi";


function NotesPage() {
  const [notes, setNotes] = useState([]);

  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const [selectedNote, setSelectedNote] = useState(null);
  const [saveStatus, setSaveStatus] = useState("");


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

  // Auto-save note after 1 second of inactivity or typing.
  const autoSave = debounce(async (note) => {
    try {
      setSaveStatus("Saving...");

      await updateNote(note._id, note);

      setSaveStatus("Saved");

      fetchNotes();
    } catch (error) {
      console.error(error);

      setSaveStatus("Save failed");
    }
  }, 1000);


  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">
        Notes
      </h1>

      {selectedNote && (
        <div className="bg-white p-6 rounded-2xl shadow mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">
              Editing Note
            </h2>
            <span className="text-sm text-gray-500">
              {saveStatus}
            </span>
          </div>
          
          <input 
          type="text"
          value={selectedNote.title}
          onChange={(e) => {
            const updated = {
              ...selectedNote,
              title: e.target.value,
            };
                
            setSelectedNote(updated);
            autoSave(updated);
          }}
          className="w-full border p-3 rounded-lg mb-4"
          />

          <textarea
            value={selectedNote.content}
            onChange={(e) => {
              const updated = {
                ...selectedNote,
                content: e.target.value,
              };

              setSelectedNote(updated);

              autoSave(updated);
            }}
            className="w-full border p-3 rounded-lg h-64 font-mono"
          />
        </div>
      )}


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
          className="w-full border p-3 rounded-lg mb-4 h-40 font-mono"
        />

        <div className="bg-gray-100 rounded-xl p-4 mb-4">
          <h3 className="font-bold mb-3">
            Live Preview
          </h3>
          
          <div className="prose max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {formData.content || "Nothing to preview"}
            </ReactMarkdown>
          </div>
        </div>

        <div className="flex gap-3 flex-wrap">

        <button
          onClick={async () => {
            const result = await summarizeNote(note.content);
            alert(result.summary);
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Summarize
        </button>


        <button
          onClick={async () => {
            const result = await generateTasks(note.content);
            alert(result.tasks);
          }}
          className="bg-green-500 text-white px-4 py-2 rounded-lg"
        >
          Generate Tasks
        </button>


        <button
          onClick={async () => {
            const result =
              await rewriteContent(note.content);

            alert(result.rewritten);
          }}
          className="bg-purple-500 text-white px-4 py-2 rounded-lg"
        >
          Rewrite
        </button>
        </div>

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

              <div className="prose max-w-none mb-6">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {note.content}
                </ReactMarkdown>
              </div>

              <button
                onClick={() => setSelectedNote(note)}
                className="bg-black text-white px-4 py-2 rounded-lg mr-3"
              >
                 Edit
              </button>

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