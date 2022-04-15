const { Schema, model } = require('mongoose');

const schema = new Schema({
  FirstName: { type: String, required: true },
  LAstName: { type: String, required: true },
  Email: { type: String, required: true },
  PAssword: { type: String, required: true },
});

module.exports = model('Register', schema);
