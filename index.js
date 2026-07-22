const express = require("express");

const app = express();

const PORT = 3000;

// Middleware
app.use(express.json());

// Log every request
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Sample Data
let users = [
    {
        id: 1,
        name: "John Doe",
        email: "john@example.com"
    },
    {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com"
    }
];

// ======================
// Home Route
// ======================
app.get("/", (req, res) => {
    res.send("Welcome to the Codveda REST API");
});

// ======================
// GET All Users
// ======================
app.get("/users", (req, res) => {
    res.status(200).json(users);
});

// ======================
// GET Single User
// ======================
app.get("/users/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const user = users.find(user => user.id === id);

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    res.status(200).json(user);

});

// ======================
// CREATE User
// ======================
app.post("/users", (req, res) => {

    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({
            message: "Name and email are required."
        });
    }

    const newUser = {
        id: users.length + 1,
        name,
        email
    };

    users.push(newUser);

    res.status(201).json({
        message: "User created successfully.",
        user: newUser
    });

});

// ======================
// UPDATE User
// ======================
app.put("/users/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const { name, email } = req.body;

    const user = users.find(user => user.id === id);

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    if (!name || !email) {
        return res.status(400).json({
            message: "Name and email are required."
        });
    }

    user.name = name;
    user.email = email;

    res.status(200).json({
        message: "User updated successfully.",
        user
    });

});

// ======================
// DELETE User
// ======================
app.delete("/users/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const userIndex = users.findIndex(user => user.id === id);

    if (userIndex === -1) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    const deletedUser = users.splice(userIndex, 1);

    res.status(200).json({
        message: "User deleted successfully.",
        user: deletedUser[0]
    });

});

// ======================
// Start Server
// ======================
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});