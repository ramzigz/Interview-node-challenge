import getUsers from './get.controller.js';
import deleteUsr from './delete.controller.js';
import createUser from './create.controller.js';
import update from './update.controller.js';

const create = (req, res, next) => createUser(req, res, next);

const getList = (req, res, next) => getUsers.list(req, res, next);

const getOne = (req, res, next) => { getUsers.one(req, res, next); };

const deleteUser = (req, res, next) => { deleteUsr(req, res, next); };

const updateUser = (req, res, next) => { update(req, res, next); };

export {
  create,
  getOne,
  getList,
  deleteUser,
  updateUser,
};
