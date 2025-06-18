import React, { useState } from "react";
import { deleteTodo, updateTodo } from "../services/api";
import NoteModal from "./NoteModal";

const TodoCard = ({ todo, fetchData }) => {
  const [open, setOpen] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(todo.title);
  const [updatedDescription, setUpdatedDescription] = useState(
    todo.description
  );

  const handleDelete = async () => {
    await deleteTodo(todo._id);
    fetchData();
  };

  const handleUpdate = async () => {
    await updateTodo(todo._id, {
      title: updatedTitle,
      description: updatedDescription,
    });
    fetchData();
  };

  return (
    <div className="border p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold">{todo.title}</h2>
      <p>{todo.description}</p>

      <div className="mt-2 flex gap-2">
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-2 py-1"
        >
          Delete
        </button>
        <button
          onClick={handleUpdate}
          className="bg-green-500 text-white px-2 py-1"
        >
          Update
        </button>
        <button
          onClick={() => setOpen(true)}
          className="bg-blue-500 text-white px-2 py-1"
        >
          Notes
        </button>
      </div>

      {open && <NoteModal id={todo._id} setOpen={setOpen} />}
    </div>
  );
};

export default TodoCard;
