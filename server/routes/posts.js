const {
	updateUserFilePosts,
	createUserFilePost,
	deleteUserFilePost
} = require('../utils/fileManipulation');
const { Post, validatePost } = require('../models/post');
const { User } = require('../models/user');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
	let userId = req.query.userId;
	let posts;

	if (userId) posts = await Post.find({ userId });
	else posts = await Post.find();

	res.json(posts);
});

router.get('/:id', async (req, res) => {
	let post = await Post.findOne({ id: req.params.id });

	if (!post) return res.status(404).send('The post with the given ID was not found');

	res.json(post);
});

router.post('/', async (req, res) => {
	const { error } = validatePost(req.body);
	if (error) return res.status(400).send(error.details[0].message);

  let lastPost = await Post.findOne({}).sort({ id: -1 });
  let id;
  if (lastPost) id = ++lastPost.id;
  else id = 1;

	const user = await User.findOne({ id: req.body.userId });

	if (!user) return res.status(404).send('the user with the given ID was not found.');

	const newPost = new Post({
		userId: req.body.userId,
		id,
		title: req.body.title,
		body: req.body.body
	});

	createUserFilePost(user.id, user.name, newPost);
	await newPost.save();

	res.json(newPost);
});

router.delete('/:id', async (req, res) => {
	const post = await Post.findOneAndDelete({ id: req.params.id });

	if (!post) return res.status(404).send('the user with the given ID was not found.');

	const { id: userId, name: userName } = await User.findOne({
		id: post.userId
	});
	deleteUserFilePost(userId, userName, post.id);

	res.json(post);
});

router.put('/:id', async (req, res) => {
	const { error } = validatePost(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	let post = await Post.findOne({ id: req.params.id });

	if (!post) return res.status(404).send('The post with the given ID was not found');

	const user = await User.findOne({ id: post.userId });
	const { name: userName, id: userId } = user;
	updateUserFilePosts(userId, userName, req.params.id, req.body);

	post.title = req.body.title;
	post.body = req.body.body;
	await post.save();

	res.json(post);
});

module.exports = router;
