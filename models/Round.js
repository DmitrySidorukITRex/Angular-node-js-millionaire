const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roundSchema = new Schema({
  question: {
    type: String,
    required: true,
  },
  answers: {
    type: Array,
    required: true,
  },
  rightAnswer: {
    type: String,
    required: true,
  },
  roundNumber: {
    type: Number,
    required: true,
  },
  scores: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('round', roundSchema);
