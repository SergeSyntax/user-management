const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const _ = require('lodash');

const User = mongoose.model(
  'User',
  new mongoose.Schema({
    id: { type: Number, required: true, min: 1, unique: true, default: 0 },
    name: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 50,
      trim: true,
    },
    username: String,
    email: {
      type: String,
      required: true,
      minlength: 4,
      maxlength: 255,
      trim: true,
      get: (email) => _.toLower(email),
      set: (email) => _.toLower(email),
    },
    address: {
      street: String,
      suite: String,
      city: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50,
        trim: true,
        get: (email) => _.startCase(_.toLower(email)),
        set: (email) => _.startCase(_.toLower(email)),
      },
      zipcode: String,
      geo: {
        lat: String,
        lng: String,
      },
    },
    phones: [
      {
        userID: { type: Number, required: true },
        number: { type: String, required: true, trim: true },
        phoneType: { type: String, default: 'unknown', trim: true },
      },
    ],
    website: String,
    company: {
      name: String,
      catchPhrase: String,
      bs: String,
    },
  })
);

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().required().min(1).max(50),
    email: Joi.string().required().min(4).max(150).email(),
    city: Joi.string().required().min(1).max(50),
  });
  return schema.validate(user);
}

function validatePhone(phone) {
  const schema = Joi.object({
    number: Joi.string().required().min(1).max(500),
    phoneType: Joi.string().required().min(1).max(250),
  });
  return schema.validate(phone);
}

module.exports = {
  User,
  validateUser,
  validatePhone,
};
