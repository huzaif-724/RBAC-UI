let users = [
    { id: 1, name: "Huzaif Mohd", email: "huzaifmohammad724@example.com", role: "Admin", status: "Active" },
    { id: 2, name: "Ganesh", email: "ganesh32@example.com", role: "User", status: "Inactive" },
    { id: 3, name: "Surya", email: "suryauikey65@example.com", role: "User", status: "Active" },
    { id: 4, name: "Shrinivas", email: "shri@example.com", role: "User", status: "Active" },
    { id: 5, name: "Imroz", email: "imroz23@example.com", role: "User", status: "Inactive" },
    { id: 6, name: "Anas", email: "anas56@example.com", role: "User", status: "Inactive" },
    { id: 7, name: "Virat", email: "viratkohli18@example.com", role: "User", status: "Active" },
    { id: 8, name: "Atharva", email: "atharva8@example.com", role: "User", status: "Active" },
    { id: 9, name: "Mahesh", email: "mahesh87@example.com", role: "User", status: "Inactive" },
    { id: 10, name: "Zoya", email: "zoya23@example.com", role: "User", status: "Active" },
];

let roles = [
    { id: 1, name: "Admin", permissions: ["Read", "Write", "Delete"] },
    { id: 2, name: "User", permissions: ["Read"] },
];

const simulateDelay = (response, delay = 500) =>
    new Promise((resolve) => setTimeout(() => resolve(response), delay));

export const api = {
    // User APIs
    getUsers: () => simulateDelay(users),
    addUser: (user) => {
        user.id = users.length + 1;
        users.push(user);
        return simulateDelay(user);
    },
    updateUser: (id, updatedUser) => {
        users = users.map((user) => (user.id === id ? { ...user, ...updatedUser } : user));
        return simulateDelay(users.find((user) => user.id === id));
    },
    deleteUser: (id) => {
        users = users.filter((user) => user.id !== id);
        return simulateDelay({ success: true });
    },

    // Role APIs
    getRoles: () => simulateDelay(roles),
    addRole: (role) => {
        role.id = roles.length + 1;
        roles.push(role);
        return simulateDelay(role);
    },
    updateRole: (id, updatedRole) => {
        roles = roles.map((role) => (role.id === id ? { ...role, ...updatedRole } : role));
        return simulateDelay(roles.find((role) => role.id === id));
    },
    deleteRole: (id) => {
        roles = roles.filter((role) => role.id !== id);
        return simulateDelay({ success: true });
    },
};
