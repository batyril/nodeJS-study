import { Router } from 'express';
import {
  addComment,
  clearComments,
  deleteOneComment,
  getAllComments,
  getOneComment,
  updateComment,
} from '../controllers/comments/index.js';
import verifyRequiredFields from '../middlewares/verifyRequiredFields.js';
import checkIds from '../middlewares/checkIds.js';

const commentsRouter = Router();

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

commentsRouter.put(
  '/:movieId/comment/:commentId',
  verifyRequiredFields(['comment', 'name']),
  checkIds(['movieId', 'commentId']),
  updateComment
);

commentsRouter.post(
  '/:movieId/comment',
  verifyRequiredFields(['comment', 'name']),
  addComment
);

export default commentsRouter;
