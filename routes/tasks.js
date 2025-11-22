const express = require('express');
const router = express.Router();

let tasks = [
    {
        id: 1,
        title: "Set up environment",
        description: "Install Node.js, npm, and git",
        completed: true,
    }
];

const validateTaskInput = (req, res, next) => {
    const { title, description, completed } = req.body;

    if (!title || !description || completed === undefined) {
        return res.status(400).json({ error: "Missing required fields: title, description, completed" });
    }

    if (typeof title !== 'string' || typeof description !== 'string' || typeof completed !== 'boolean') {
        return res.status(400).json({ error: "Invalid data types. Title/Desc must be strings, completed must be boolean." });
    }

    next();
};

router.get('/', (req, res) => {
    res.json(tasks);
});

router.get('/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find(t => t.id === taskId);

    if (!task) {
        return res.status(404).send();
    }

    res.json(task);
});

router.post('/', validateTaskInput, (req, res) => {
    const newTask = {
        title: req.body.title,
        description: req.body.description,
        completed: req.body.completed
    };

    tasks.push(newTask);

    res.status(201).json(newTask);
});

router.put('/:id', validateTaskInput, (req, res) => {
    const taskId = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(t => t.id === taskId);

    if (taskIndex === -1) {
        return res.status(404).send();
    }

    tasks[taskIndex] = {
        id: taskId,
        title: req.body.title,
        description: req.body.description,
        completed: req.body.completed
    };

    res.status(200).send();
});

router.delete('/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(t => t.id === taskId);

    if (taskIndex === -1) {
        return res.status(404).send();
    }

    tasks.splice(taskIndex, 1);

    res.status(200).send();
});

module.exports = router;