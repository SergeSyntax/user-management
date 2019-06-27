const mongoose = require('mongoose');
const axios = require('axios');
const _ = require('lodash');
const { createJsonFile, createLogDirectory, removeLogDirectory, createObjectFileStructure } = require('../utils/fileManipulation');
require('../config/database');

const { User } = require('../models/user');
const { Post } = require('../models/post');
const { Task } = require('../models/task');

(async function initialServer() {
	const data = await getData();
	data.users = convertPhoneFromStringToObject(data.users);
	createFileLogs(data);
  await insertDataIntoDB(data);
  console.log(`Finished the server initialization.`);
  
	process.exit();
})();

async function createFileLogs(data) {
	await removeLogDirectory();
	await createLogDirectory();
	console.log('Create log directory.');

	const { users, posts, tasks } = data;
	users.forEach(async user => {
		try {
			const obj = createObjectFileStructure(user);
			obj.changeLog[0].data.posts = posts.filter(post => post.userId === user.id);
			obj.changeLog[0].data.tasks = tasks.filter(task => task.userId === user.id);
			const message = await createJsonFile(`${user.id}-${user.name}`, obj);
			console.log(message);
		} catch (error) {
			console.log(`Failed creating ${user.id}-${user.name}`, error);
		}
	});
}

function insertDataIntoDB(data) {
	return new Promise(async (res, rej) => {
		try {
			const { users, posts, tasks } = data;
			await mongoose.connection.db.dropDatabase();
			await User.insertMany(users);
			await Post.insertMany(posts);
			await Task.insertMany(tasks);
			res({ users, posts, tasks });
			console.log('Inserted data into the Database.');
		} catch (error) {
			rej(`Failed inserting the data into the database, ${error}`);
		}
	});
}

function convertPhoneFromStringToObject(data) {
	return data.map(user => {
		let phoneDetails = user.phone.split(' ');
		user.phones = [];
		user.phones.push({
			userID: user.id,
			number: phoneDetails[0],
			phoneType: phoneDetails[1]
		});
		return _.omit(user, 'phone');
	});
}

function getData() {
	return new Promise(async (res, rej) => {
		try {
			const { data: users } = await axios.get('https://jsonplaceholder.typicode.com/users');
			const { data: tasks } = await axios.get('https://jsonplaceholder.typicode.com/todos');
			const { data: posts } = await axios.get('https://jsonplaceholder.typicode.com/posts');
			console.log(`Downloaded data.`);

			res({ users, posts, tasks });
		} catch (error) {
			console.log('Failed downloading the data.');
			rej(error);
		}
	});
}
