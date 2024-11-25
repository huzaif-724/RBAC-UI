import React, { useState, useEffect } from "react";
import { api } from "../mockApi"; // Assume api is set up for mock API calls

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    api.getUsers().then(setUsers);
  }, []);

  const handleAddUser = () => {
    setSelectedUser(null);
    setModalVisible(true);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setModalVisible(true);
  };

  const handleDeleteUser = (userId) => {
    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);
    api.deleteUser(userId);
  };

  const handleSaveUser = (userData) => {
    if (selectedUser) {
      const updatedUsers = users.map((user) =>
        user.id === selectedUser.id ? { ...user, ...userData } : user
      );
      setUsers(updatedUsers);
    } else {
      const newUser = { ...userData, id: Date.now() };
      setUsers([...users, newUser]);
    }
    setModalVisible(false);
  };

  const handleExportCSV = () => {
    const csvContent = [
      ["ID", "Name", "Email", "Role", "Status"],
      ...users.map(({ id, name, email, role, status }) => [id, name, email, role, status]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "users.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) &&
      (filterRole ? user.role === filterRole : true) &&
      (filterStatus ? user.status === filterStatus : true)
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>

      {/* Search, Filter, Add Button */}
      <div className="mb-4 flex flex-wrap gap-4">
        <input
          type="text"
          placeholder="Search by name"
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded w-full sm:w-auto flex-grow"
        />
        <select
          onChange={(e) => setFilterRole(e.target.value)}
          className="p-2 border rounded w-full sm:w-auto flex-grow"
          defaultValue=""
        >
          <option value="">Filter by Role</option>
          <option value="Admin">Admin</option>
          <option value="User">User</option>
        </select>
        <select
          onChange={(e) => setFilterStatus(e.target.value)}
          className="p-2 border rounded w-full sm:w-auto flex-grow"
          defaultValue=""
        >
          <option value="">Filter by Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <button
          onClick={handleAddUser}
          className="bg-blue-500 text-white p-2 rounded w-full sm:w-auto"
        >
          Add User
        </button>
      </div>

      {/* Export Button */}
      <div className="mb-4">
        <button
          onClick={handleExportCSV}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Export to CSV
        </button>
      </div>

      {/* User Table */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-200 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Role</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td className="border px-4 py-2">{user.id}</td>
                <td className="border px-4 py-2">{user.name}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">{user.role}</td>
                <td className="border px-4 py-2">{user.status}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleEditUser(user)}
                    className="bg-richblue-800 text-white px-2 py-1 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="bg-richblue-800 text-white px-2 py-1 rounded mr-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {modalVisible && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className=" bg-richblue-700 p-6 rounded-lg shadow-[5px_5px_20px_5px]  shadow-blue-200 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-white">{selectedUser ? "Edit User" : "Add User"}</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSaveUser({
                  name: e.target.name.value,
                  email: e.target.email.value,
                  role: e.target.role.value,
                  status: e.target.status.value,
                });
              }}
            >
              <input
                name="name"
                type="text"
                defaultValue={selectedUser?.name || ""}
                placeholder="Name"
                className="w-full p-2 border mb-4 rounded-md"
                required
              />
              <input
                name="email"
                type="email"
                defaultValue={selectedUser?.email || ""}
                placeholder="Email"
                className="w-full p-2 border mb-4 rounded-md"
                required
              />
              <select
                name="role"
                defaultValue={selectedUser?.role || ""}
                className="w-full p-2 border mb-4 rounded-md"
                required
              >
                <option value="Admin">Admin</option>
                <option value="User">User</option>
              </select>
              <select
                name="status"
                defaultValue={selectedUser?.status || ""}
                className="w-full p-2 border mb-4 rounded-md"
                required
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setModalVisible(false)}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
