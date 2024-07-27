import { body, query } from 'express-validator';

export const categoryChain = () => body('title').isString().trim().notEmpty();

export const categoryFiltersChain = () => [
  query('title')
    .isString()
    .withMessage('Поле title должно быть строкой')
    .trim()
    .notEmpty()
    .withMessage('Поле title не может быть пустым')
    .optional(),
  query('id')
    .isMongoId()
    .withMessage('Поле category должно быть валидным Mongo ID')
    .notEmpty()
    .withMessage('Поле sort не может быть пустым')
    .optional(),
  query('sort')
    .isString()
    .withMessage('Поле sort должно быть строкой')
    .notEmpty()
    .withMessage('Поле sort не может быть пустым')
    .isIn(['title'])
    .withMessage('Поле sortOrder должно быть одним из')
    .optional(),
  query('sortOrder')
    .isString()
    .withMessage('Поле sort должно быть строкой')
    .notEmpty()
    .withMessage('Поле sort не может быть пустым')
    .isIn(['desc', 'asc'])
    .withMessage('Поле sortOrder должно быть одним из: asc, desc')
    .optional(),
];

export const yearChain = () => [
  query('max')
    .isNumeric()
    .withMessage('параметр max должно быть числовым ')
    .notEmpty(),
  query('min')
    .isNumeric()
    .withMessage('параметр min должно быть числовым ')
    .notEmpty(),
];

export const commentsChain = () => [
  body('name').isString().trim().notEmpty(),
  body('comment').isString().trim().notEmpty(),
];

export const directorChain = () => [
  body('name').isString().trim().notEmpty(),
  body('birthDate').isString().trim().notEmpty(),
];

export const moviesFiltersChain = () => [
  query('title')
    .isString()
    .withMessage('Поле title должно быть строкой')
    .trim()
    .notEmpty()
    .withMessage('Поле title не может быть пустым')
    .optional(),
  query('id')
    .isMongoId()
    .withMessage('Поле category должно быть валидным Mongo ID')
    .notEmpty()
    .withMessage('Поле sort не может быть пустым')
    .optional(),
  query('year')
    .isNumeric()
    .withMessage('Поле year должно быть числом')
    .notEmpty()
    .withMessage('Поле year не может быть пустым')
    .isLength({ min: 4, max: 4 })
    .withMessage('Поле year должно содержать 4 цифры')
    .optional(),
  query('category')
    .isString()
    .withMessage('Поле category должно быть строкой')
    .notEmpty()
    .withMessage('Поле category не может быть пустым')
    .isMongoId()
    .withMessage('Поле category должно быть валидным Mongo ID')
    .optional(),
  query('director')
    .isString()
    .withMessage('Поле director должно быть строкой')
    .notEmpty()
    .withMessage('Поле director не может быть пустым')
    .isMongoId()
    .withMessage('Поле director должно быть валидным Mongo ID')
    .optional(),
  query('sort')
    .isString()
    .withMessage('Поле sort должно быть строкой')
    .notEmpty()
    .withMessage('Поле sort не может быть пустым')
    .isIn([
      'title',
      'category',
      'year',
      'title',
      'duration',
      'director',
      'comments',
    ])
    .withMessage('Поле sortOrder должно быть одним из')
    .optional(),
  query('sortOrder')
    .isString()
    .withMessage('Поле sort должно быть строкой')
    .notEmpty()
    .withMessage('Поле sort не может быть пустым')
    .isIn(['desc', 'asc'])
    .withMessage('Поле sortOrder должно быть одним из: asc, desc')
    .optional(),
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
