const Round = require('../models/Round');
const errorHandler = require('../utils/errorHandler');

module.exports.getRounds = async function (req, res) {
  try {
    let rounds = [];
    for (let i = 1; i <= 15; i++) {
      const round = await Round.find({ roundNumber: i });
      const random = Math.floor(Math.random() * round.length);
      rounds.push(round[random]);
    }

    res.status(200).json(rounds);
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.create = async function (req, res) {
  console.log(req.body);
  const round = new Round({
    question: req.body.question,
    answers: req.body.answers,
    rightAnswer: req.body.rightAnswer,
    roundNumber: req.body.roundNumber,
    scores: req.body.scores,
  });

  try {
    await round.save();
    res.status(201).json(round);
  } catch (e) {
    errorHandler(res, e);
  }
};
