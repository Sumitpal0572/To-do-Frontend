

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const createTodo = async (todoData) => {
    const res = await fetch(`${BASE_URL}/api/todos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(todoData),
    });
    if (!res.ok) throw new Error("Failed to create todo");
    return res.json();
};

export const getTodosByUser = async (username) => {
    const res = await fetch(`${BASE_URL}/api/todos/${username}`);
    if (!res.ok) throw new Error("Failed to get todos");
    return res.json();
};

export const deleteTodo = async (id) => {
    const res = await fetch(`${BASE_URL}/api/todos/${id}`, {
        method: 'DELETE',
    });
    if (!res.ok) throw new Error("Failed to delete todo");
    return res.json();
};

export const updateTodo = async (id, data) => {
    const res = await fetch(`${BASE_URL}/api/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update todo");
    return res.json();
};

export const addNote = async (id, note) => {
    const res = await fetch(`${BASE_URL}/api/todos/${id}/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ note }),
    });
    if (!res.ok) throw new Error("Failed to add note");
    return res.json();
};
