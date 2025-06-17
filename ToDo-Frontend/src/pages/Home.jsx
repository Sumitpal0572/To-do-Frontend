import { useEffect, useState } from "react";
import {
  getTodosByUser,
  getUsers,
  createTodo,
  deleteTodoById,
} from "../services/api";
import TodoCard from "../components/TodoCard";
import NoteModal from "../components/NoteModal";
import Navbar from "../components/Navbar";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState("");
  const [todos, setTodos] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "Low",
    tags: "",
    mentions: "",
  });

  useEffect(() => {
    getUsers().then((data) => {
      setUsers(data);
      if (data.length) setCurrentUser(data[0].username);
    });
  }, []);

  useEffect(() => {
    if (currentUser) {
      getTodosByUser(currentUser).then(setTodos);
    }
  }, [currentUser]);

  const handleCreate = async () => {
    const todo = {
      ...form,
      createdBy: currentUser,
      tags: form.tags.split(","),
      mentions: form.mentions.split(","),
    };
    await createTodo(todo);
    getTodosByUser(currentUser).then(setTodos);
    setForm({
      title: "",
      description: "",
      priority: "Low",
      tags: "",
      mentions: "",
    });
  };

  const handleDelete = async (id) => {
    await deleteTodoById(id);
    getTodosByUser(currentUser).then(setTodos);
  };

  return (
    <div className="p-6">
      <Navbar
        users={users}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
      />
      <div className="my-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          className="p-2 border"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <input
          className="p-2 border"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <input
          className="p-2 border"
          placeholder="Tags (comma-separated)"
          value={form.tags}
          onChange={(e) => setForm({ ...form, tags: e.target.value })}
        />
        <input
          className="p-2 border"
          placeholder="Mentions (@user)"
          value={form.mentions}
          onChange={(e) => setForm({ ...form, mentions: e.target.value })}
        />
        <select
          className="p-2 border"
          value={form.priority}
          onChange={(e) => setForm({ ...form, priority: e.target.value })}
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
        <button
          onClick={handleCreate}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Create Todo
        </button>
      </div>
      <div className="grid gap-4">
        {todos.map((todo) => (
          <TodoCard
            key={todo._id}
            todo={todo}
            onDelete={() => handleDelete(todo._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
