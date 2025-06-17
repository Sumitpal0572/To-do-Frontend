const API = 'http://localhost:5000/api';

export const getUsers = async () => {
    const res = await fetch(`${API}/users`);
    return res.json();
};

export const getTodosByUser = async (username) => {
    const res = await fetch(`${API}/todos/${username}`);
    return res.json();
};

export const createTodo = async (todo) => {
    const res = await fetch(`${API}/todos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(todo),
    });
    return res.json();
};

export const deleteTodoById = async (id) => {
    const res = await fetch(`${API}/todos/${id}`, {
        method: 'DELETE',
    });
    return res.json();
};

export const addNoteToTodo = async (id, note) => {
    const res = await fetch(`${API}/todos/${id}/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ note }),
    });
    return res.json();
};
