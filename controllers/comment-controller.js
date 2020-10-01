const { Comment, Pizza } = require('../models');

const commentController = {
  // add new comment
  addComment({ params, body }, res) {
    Comment.create(body)
      .then(({ _id }) => {
        return Pizza.findOneAndUpdate(
          { _id: params.pizzaId },
          { $push: { comments: _id } },
          { new: true, runValidators: true }
        )
        .populate(
          {
            path: 'comments',
            select: '-__v'
          }
        )
        .select('-__v')
      })
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

  // add new reply
  addReply({ params, body }, res) {
    Comment.findOneAndUpdate(
      { _id: params.commentId },
      { $push: { replies: body } },
      { new: true }
    )
      .then(dbPizzaData => {
        if (!dbPizzaData) {
          res.status(404).json({ message: `No pizza found with that it.` });
          return;
        }
        res.status(200).json(dbPizzaData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // delete comment by id
  deleteComment({ params }, res) {
    Comment.findOneAndDelete({ _id: params.commentId })
      .then(deletedComment => {
        if (!deletedComment) {
          res.status(404).json({ message: `No comment found with that id.` });
          return;
        }
        return Pizza.findOneAndUpdate(
          { _id: params.pizzaId },
          { $pull: { comments: params.commentId } },
          { new: true }
        );
      })
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

  // delete reply by id
  deleteReply({ params }, res) {
    Comment.findByIdAndUpdate(
      { _id: params.commentId },
      { $pull: { replies: { replyId: params.replyId } } },
      { new: true }
    )
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
}

module.exports = commentController;