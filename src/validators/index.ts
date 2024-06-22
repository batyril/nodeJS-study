import { body } from 'express-validator';

export const categoryChain = () => body('title').isString().trim().notEmpty();

export const commentsChain = () => [
  body('name').isString().trim().notEmpty(),
  body('comment').isString().trim().notEmpty(),
];

export const directorChain = () => [
  body('name').isString().trim().notEmpty(),
  body('birthDate').isString().trim().notEmpty(),
];

export const moviesChain = () => [
  body('title')
    .isString()
    .withMessage('Поле title должно быть строкой')
    .trim()
    .notEmpty()
    .withMessage('Поле title не может быть пустым')
    .optional(),
  body('year')
    .isNumeric()
    .withMessage('Поле year должно быть числом')
    .notEmpty()
    .withMessage('Поле year не может быть пустым')
    .isLength({ min: 4, max: 4 })
    .withMessage('Поле year должно содержать 4 цифры')
    .optional(),
  body('category')
    .isString()
    .withMessage('Поле title должно быть строкой')
    .notEmpty()
    .withMessage('Поле category не может быть пустым')
    .isMongoId()
    .withMessage('Поле category должно быть валидным Mongo ID')
    .optional(),
  body('director')
    .isString()
    .withMessage('Поле title должно быть строкой')
    .notEmpty()
    .withMessage('Поле director не может быть пустым')
    .isMongoId()
    .withMessage('Поле director должно быть валидным Mongo ID')
    .optional(),
];
