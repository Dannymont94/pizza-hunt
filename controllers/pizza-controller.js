const { Pizza } = require('../models');
const { db } = require('../models/Pizza');

const pizzaController = {
  // get all pizzas
  getAllPizza(req, res) {
    Pizza.find({})
      .populate({
        path: 'comments',
        select: '-__v'
      })
      .select('-__v')
      .sort({ _id: -1 })
      .then(dbPizzaData => res.status(200).json(dbPizzaData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // get one pizza by id
  getPizzaById({ params }, res) {
    Pizza.findOne({ _id: params.id })
      .populate({
        path: 'comments',
        select: '-__v'
      })
      .select('-__v')
      .then(dbPizzaData => {
        if (!dbPizzaData) {
          res.status(404).json({ message: `No pizza found with that id.` });
          return;
        }

        res.status(200).json(dbPizzaData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // create new pizza
  createPizza({ body }, res) {
    Pizza.create(body)
      .then(dbPizzaData => res.status(200).json(dbPizzaData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      })
  },

  // update pizza by id
  updatePizza({ params, body }, res) {
    Pizza.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .then(dbPizzaData => {
        if (!dbPizzaData) {
          res.status(404).json({ message: `No pizza found with that id.` });
          return;
        }
        res.status(200).json(dbPizzaData);
      })
      .catch(err => res.status(500).json(err));
  },

  // delete pizza
  deletePizza({ params }, res) {
    Pizza.findOneAndDelete({ _id: params.id })
      .then(dbPizzaData => {
        if (!dbPizzaData) {
          res.status(404).json({ message: `No pizza found with that id.` });
          return;
        }
        res.status(200).json(dbPizzaData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  }
};

module.exports = pizzaController;