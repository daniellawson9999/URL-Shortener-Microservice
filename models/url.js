const mongoose = require('mongoose');
const shortid = require('shortid');
const urlSchema = mongoose.Schema({
  _id: {
    type: String,
    'default': shortid.generate
  },
  url: String
});

module.exports = mongoose.model("Url",urlSchema);
