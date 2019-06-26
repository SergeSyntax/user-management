const mongoose = require('mongoose');
const _ = require('lodash');
const Joi = require('joi');

const Task = mongoose.model(
  'Task',
  new mongoose.Schema({
    userId: { type: Number, required: true, min: 1 },
    id: { type: Number, required: true, min: 1, unique: true },
    title: {
      type: String,
      required: true,
      minlength: 4,
      maxlength: 255,
      trim: true,
      get: email => _.toLower(email),
      set: email => _.toLower(email)
    },
    completed: { type: Boolean, default: false }
  })
);

function validateTask(task) {
  const schema = {
    userId: Joi.number()
      .required()
      .min(1),
    title: Joi.string()
      .required()
      .min(4)
      .max(255)
  };
  return Joi.validate(task, schema);
}

function validateTaskUpdate(task) {
  const schema = {
    title: Joi.string()
      .required()
      .min(4)
      .max(255),
    completed: Joi.boolean().required()
  };
  return Joi.validate(task, schema);
}

module.exports = {
  Task,
  validateTask,
  validateTaskUpdate
};
