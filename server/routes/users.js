const {
	removeFile,
	createJsonFileForUser,
	createUserFilePhone,
	updateUserFileProperties
} = require('../utils/fileManipulation');
const { User, validateUser, validatePhone } = require('../models/user');
const { Task } = require('../models/task');
const { Post } = require('../models/post');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
	let name = req.query.name;
	let users;

	if (name) users = await User.find({ name: new RegExp(`.*${name}.*`, 'i') });
	else users = await User.find();

	res.json(users);
});

router.get('/:id', async (req, res) => {
	let users = await User.findOne({ id: req.params.id });

	if (!users) return res.status(404).send('The user with the given ID was not found');

	res.json(users);
});

router.post('/', async (req, res) => {
	const { error } = validateUser(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	let { id } = await User.findOne().sort('-id');
	++id;

	const user = new User({
		id,
		name: req.body.name,
		email: req.body.email,
		address: {
			city: req.body.city
		}
	});

	await user.save();
	await createJsonFileForUser(user);
	res.send(user);
});

router.put('/:id', async (req, res) => {
	const { error } = validateUser(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const user = await User.findOne({ id: req.params.id });

	if (!user) return res.status(404).send('the user with the given ID was not found.');

	const { name: oldName } = user;
	user.name = req.body.name;
	user.email = req.body.email;
	user.address.city = req.body.city;

	await updateUserFileProperties(user.id, oldName, req.body);
	await user.save();
	res.json(user);
});

router.post('/:id/phones', async (req, res) => {
	const { error } = validatePhone(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const user = await User.findOne({ id: req.params.id });

	if (!user) return res.status(404).send('the user with the given ID was not found.');

	const newPhone = {
		userID: req.params.id,
		number: req.body.number,
		phoneType: req.body.phoneType
	};

	createUserFilePhone(req.params.id, user.name, newPhone);

	user.phones.push(newPhone);
	await user.save();
	res.json(user);
});

router.delete('/:id', async (req, res) => {
	const user = await User.findOneAndDelete({ id: req.params.id });

	if (!user) return res.status(404).send('the user with the given ID was not found.');

	await Task.deleteMany({ userId: req.params.id });
	await Post.deleteMany({ userId: req.params.id });
	await removeFile(`${user.id}-${user.name}`);
	res.json(user);
});

module.exports = router;
