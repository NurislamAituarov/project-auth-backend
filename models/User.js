const { Schema, model } = require('mongoose');

const schema = new Schema({
  FirstName: { type: String, required: true },
  LastName: { type: String, required: true },
  Email: { type: String, required: true },
  Password: { type: String, required: true },
});

module.exports = model('Register', schema);
