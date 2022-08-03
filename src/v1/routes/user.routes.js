import express from 'express';
import { validate } from 'express-validation';
import usersValidation from '../validations/users.validation.js';

import * as userController from '../controllers/users/index.js';

const userRoutes = express.Router();

userRoutes.post(
  '/',
  validate(usersValidation.createUser, { keyByField: true }, { abortEarly: false }),
  userController.create,
);

userRoutes.route('/:id')
  .get(userController.getOne)
  .delete(userController.deleteUser)
  .put(
    validate(usersValidation.updateUser, { keyByField: true }, { abortEarly: false }),
    userController.updateUser,
  );

userRoutes.get('/', userController.getList);

export default userRoutes;
