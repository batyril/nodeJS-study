import { Router } from 'express';
import {
  addComment,
  clearComments,
  deleteOneComment,
  getAllComments,
  getOneComment,
  updateComment,
} from '../controllers/comments/index.js';
import checkIds from '../middlewares/checkIds.js';
import { commentsChain } from '../validators/index.js';
import checkValidationErrors from '../middlewares/checkValidationErrors.js';

const commentsRouter = Router();

commentsRouter.post(
  '/:movieId/comment',
  commentsChain(),
  checkValidationErrors(),
  addComment
);

commentsRouter.put(
  '/:movieId/comment/:commentId',
  commentsChain(),
  checkValidationErrors(),
  checkIds(['movieId', 'commentId']),
  updateComment
);

commentsRouter.get(
  '/:movieId/comment/:commentId',
  checkIds(['movieId', 'commentId']),
  getOneComment
);

commentsRouter.get('/:movieId/comment', checkIds(['movieId']), getAllComments);

commentsRouter.delete(
  '/:movieId/comment',
  checkIds(['movieId']),
  clearComments
);

commentsRouter.delete(
  '/:movieId/comment/:commentId',
  checkIds(['movieId', 'commentId']),
  deleteOneComment
);

export default commentsRouter;
