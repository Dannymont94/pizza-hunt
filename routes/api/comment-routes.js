const router = require('express').Router();
const { addComment, deleteComment } = require('../../controllers/comment-controller');

// endpoint /api/comments/:pizzaId
router
  .route('/:pizzaId')
  .post(addComment);

// endpoint /api/comments/:pizzaId/:commentId
router
  .route('/:pizzaId/:commentId')
  .delete(deleteComment);

module.exports = router;