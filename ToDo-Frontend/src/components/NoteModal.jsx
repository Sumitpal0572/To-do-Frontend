import { useState } from "react";
import { addNoteToTodo } from "../services/api";

const NoteModal = ({ todoId, onClose }) => {
  const [note, setNote] = useState("");

  const handleSubmit = async () => {
    await addNoteToTodo(todoId, note);
    onClose();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded">
        <h3 className="mb-4 text-lg font-semibold">Add Note</h3>
        <textarea
          className="w-full border p-2"
          rows={4}
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <div className="flex justify-end mt-4 gap-2">
          <button onClick={onClose} className="px-4 py-2 border rounded">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteModal;
