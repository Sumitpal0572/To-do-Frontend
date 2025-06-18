import React, { useState } from "react";
import { addNote } from "../services/api";

const NoteModal = ({ id, setOpen }) => {
  const [note, setNote] = useState("");

  const handleAddNote = async () => {
    await addNote(id, { note });
    setNote("");
    setOpen(false);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded">
        <h2 className="text-lg font-bold mb-2">Add Note</h2>
        <textarea
          className="w-full border p-2 mb-2"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={() => setOpen(false)}
            className="bg-gray-400 text-white px-4 py-1"
          >
            Cancel
          </button>
          <button
            onClick={handleAddNote}
            className="bg-blue-600 text-white px-4 py-1"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteModal;
