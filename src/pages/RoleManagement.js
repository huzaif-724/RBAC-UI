import React, { useState, useEffect } from "react";
import { api } from "../mockApi";

const RoleManagement = () => {
  const [roles, setRoles] = useState([]);
  const [newRole, setNewRole] = useState("");
  const [permissions, setPermissions] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    api.getRoles().then(setRoles);
  }, []);

  const handleAddRole = () => {
    setRoles([...roles, { name: newRole, permissions }]);
    setNewRole("");
    setPermissions([]);
    setShowModal(false);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center sm:text-left">Role Management</h1>
      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4 w-full sm:w-auto"
      >
        Add Role
      </button>

      {/* Roles Table */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Role</th>
              <th className="border px-4 py-2">Permissions</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role) => (
              <tr key={role.name}>
                <td className="border px-4 py-2">{role.name}</td>
                <td className="border px-4 py-2">{role.permissions.join(", ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Adding Role */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center px-4">
          <div className="bg-richblue-700 p-6 rounded-lg w-full max-w-lg shadow-[5px_5px_20px_5px] shadow-blue-200 text-white">
            <h2 className="text-xl font-bold mb-4">Add Role</h2>
            <input
              type="text"
              placeholder="Role Name"
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
              className="p-2 border rounded mb-4 w-full"
            />
            <input
              type="text"
              placeholder="Permissions (comma-separated)"
              value={permissions.join(", ")}
              onChange={(e) => setPermissions(e.target.value.split(","))}
              className="p-2 border rounded mb-4 w-full"
            />
            <div className="flex flex-col sm:flex-row justify-between space-y-2 sm:space-y-0">
              <button
                onClick={handleAddRole}
                className="bg-blue-500 text-white px-4 py-2 rounded w-full sm:w-auto"
              >
                Add Role
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-blue-500 text-white px-4 py-2 rounded w-full sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoleManagement;
