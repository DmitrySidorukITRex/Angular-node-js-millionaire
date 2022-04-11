const Game = require('../models/Game');
const errorHandler = require('../utils/errorHandler');

module.exports.getGameInfo = async function (req, res) {
  try {
    const game = await Game.findOne();
    res.status(200).json(game);
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.create = async function (req, res) {
  console.log(req.body);
  const game = new Game({
    rounds: req.body.rounds,
  });

  try {
    await game.save();
    res.status(201).json(game);
  } catch (e) {
    errorHandler(res, e);
  }
};
