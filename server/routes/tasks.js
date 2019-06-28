const { Task, validateTask, validateTaskUpdate } = require('../models/task');
const { User } = require('../models/user');
const express = require('express');
const router = express.Router();
const {
	createUserFileTask,
	deleteUserFileTask,
	updateUserFileTasks
} = require('../utils/fileManipulation');

router.get('/', async (req, res) => {
	let userId = req.query.userId;
	let tasks;

	if (userId) tasks = await Task.find({ userId });
	else tasks = await Task.find();

	res.json(tasks);
});

router.get('/:id', async (req, res) => {
	let task = await Task.findOne({ id: req.params.id });

	if (!task) return res.status(404).send('The task with the given ID was not found');

	res.json(task);
});

router.post('/', async (req, res) => {
	const { error } = validateTask(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	let { id } = await Task.findOne({}).sort({ id: -1 });
	id++;

	const user = await User.findOne({ id: req.body.userId });

	if (!user) return res.status(404).send('the user with the given ID was not found.');

	const newTask = new Task({
		userId: req.body.userId,
		id,
		title: req.body.title
	});

	createUserFileTask(user.id, user.name, newTask);
	await newTask.save();

	res.json(newTask);
});

router.delete('/:id', async (req, res) => {
	const task = await Task.findOneAndDelete({ id: req.params.id });
	
	if (!task) return res.status(404).send('the user with the given ID was not found.');

	const { id: userId, name: userName } = await User.findOne({
		id: task.userId
	});
	deleteUserFileTask(userId, userName, task.id);

	res.json(task);
});

router.put('/:id', async (req, res) => {
	const { error } = validateTaskUpdate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	let task = await Task.findOne({ id: req.params.id });

	if (!task) return res.status(404).send('The task with the given ID was not found');

	const user = await User.findOne({ id: task.userId });
	const { name: userName, id: userId } = user;
	updateUserFileTasks(userId, userName, req.params.id, req.body);

	task.title = req.body.title;
	task.completed = req.body.completed;
	await task.save();

	res.json(task);
});

module.exports = router;
