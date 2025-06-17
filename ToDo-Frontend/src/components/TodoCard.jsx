import { useState } from "react";
import NoteModal from "./NoteModal";

const TodoCard = ({ todo, onDelete }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="border p-4 rounded shadow">
      <div className="flex justify-between">
        <h2 className="text-lg font-bold">{todo.title}</h2>
        <span
          className={`px-2 py-1 text-xs rounded-full ${
            todo.priority === "High" ? "bg-red-500 text-white" : "bg-yellow-300"
          }`}
        >
          {todo.priority}
        </span>
      </div>
      <p className="text-sm">{todo.description}</p>
      <p className="text-xs mt-2">Tags: {todo.tags.join(", ")}</p>
      <p className="text-xs">Mentions: {todo.mentions.join(", ")}</p>
      <div className="mt-2 flex gap-2">
        <button
          className="text-blue-500 underline"
          onClick={() => setShowModal(true)}
        >
          Add Note
        </button>
        <button className="text-red-500 underline" onClick={onDelete}>
          Delete
        </button>
      </div>
      {showModal && (
        <NoteModal todoId={todo._id} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default TodoCard;
