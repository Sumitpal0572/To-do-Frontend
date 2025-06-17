const Navbar = ({ users, currentUser, setCurrentUser }) => {
  return (
    <div className="mb-4 flex items-center gap-4">
      <h1 className="text-2xl font-bold">Todo App</h1>
      <select
        value={currentUser}
        onChange={(e) => setCurrentUser(e.target.value)}
        className="border p-2"
      >
        {users.map((user) => (
          <option key={user._id} value={user.username}>
            {user.username}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Navbar;
