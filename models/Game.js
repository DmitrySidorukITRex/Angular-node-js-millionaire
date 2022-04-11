const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameSchema = new Schema({
  rounds: [
    {
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
    },
  ],
  // scores: {
  //   type: Array,
  //   required: true,
  // },
  currentRound: {
    type: Number,
    required: true,
    default: 0,
  },
  halfHintAvailable: {
    type: Boolean,
    default: true,
  },
  hallHintAvailable: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model('game', gameSchema);
