import { useEffect, useState } from "react";
import {
  getTodosByUser,
  createTodo,
  deleteTodo,
  updateTodo,
  addNote,
} from "../services/api";
import TodoCard from "../components/TodoCard";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    createdBy: "sumit",
  });

  // Fetch todos on page load
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const data = await getTodosByUser(formData.createdBy);
      setTodos(data);
    } catch (err) {
      console.error("Error fetching todos:", err);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description) return;
    try {
      await createTodo(formData);
      setFormData({ ...formData, title: "", description: "" });
      fetchTodos();
    } catch (err) {
      console.error("Error creating todo:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      fetchTodos();
    } catch (err) {
      console.error("Error deleting todo:", err);
    }
  };

  const handleUpdate = async (id, newData) => {
    try {
      await updateTodo(id, newData);
      fetchTodos();
    } catch (err) {
      console.error("Error updating todo:", err);
    }
  };

  const handleAddNote = async (id, note) => {
    try {
      await addNote(id, note);
      fetchTodos();
    } catch (err) {
      console.error("Error adding note:", err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Todo App</h1>

      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        ></textarea>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Todo
        </button>
      </form>

      <div className="space-y-4">
        {todos.length > 0 ? (
          todos.map((todo) => (
            <TodoCard
              key={todo._id}
              todo={todo}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
              onAddNote={handleAddNote}
            />
          ))
        ) : (
          <p>No todos found.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
