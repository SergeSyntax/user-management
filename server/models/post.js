const mongoose = require('mongoose');
const _ = require('lodash');
const Joi = require('joi');

const Post = mongoose.model(
  'Post',
  new mongoose.Schema({
    userId: { type: Number, required: true, min: 1 },
    id: { type: Number, required: true, min: 1, unique: true },
    title: {
      type: String,
      required: true,
      minlength: 4,
      maxlength: 1255,
      trim: true,
      get: title => _.toLower(title),
      set: title => _.toLower(title)
    },
    body: {
      type: String,
      required: true,
      minlength: 4,
      maxlength: 3255,
      trim: true,
      get: body => _.toLower(body),
      set: body => _.toLower(body)
    }
  })
);

function validatePost(post) {
  const schema = {
    userId: Joi.number()
      .required()
      .min(1),
    title: Joi.string()
      .required()
      .min(4)
      .max(1255),
    body: Joi.string()
      .required()
      .min(4)
      .max(3255)
  };
  return Joi.validate(post, schema);
}

module.exports = { Post, validatePost };
