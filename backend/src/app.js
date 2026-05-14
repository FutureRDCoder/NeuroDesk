const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const aiRoutes = require("./modules/ai/ai.routes");
const authRoutes = require('./modules/auth/authRoutes');
const notesRoutes = require("./modules/notes/notesRoutes");
const tasksRoutes = require("./modules/tasks/taskRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Route for authentication
app.use('/api/auth', authRoutes);

// Route for notes
app.use('/api/notes', notesRoutes);

// Route for tasks
app.use("/api/tasks", tasksRoutes);

// Route for AI features
app.use("/api/ai", aiRoutes);

// Route for Health-Check
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: "NeuroDesk API is running successfully!",
    });
});

module.exports = app;