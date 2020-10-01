const router = require('express').Router();
const { addComment, deleteComment, addReply, deleteReply } = require('../../controllers/comment-controller');

// endpoint /api/comments/:pizzaId
router
  .route('/:pizzaId')
  .post(addComment);

// endpoint /api/comments/:pizzaId/:commentId
router
  .route('/:pizzaId/:commentId')
  .put(addReply)
  .delete(deleteComment);

// endpoint /api/comments/:pizzaId/:commentId/:replyId
router
  .route('/:pizzaId/:commentId/:replyId')
  .delete(deleteReply);

module.exports = router;