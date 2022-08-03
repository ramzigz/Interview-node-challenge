/* eslint-disable no-underscore-dangle */
import { ErrorHandler } from '../../../utils/errorsHandler.js';
import httpStatusCodes from '../../../utils/httpStatusCodes.js';
import responseHandler from '../../../utils/responseHandler.js';
import userServices from '../../services/user.services.js';

const getUsers = {
  async list(req, res, next) {
    try {
      const { list, counts } = await userServices.getList();

      return res.status(httpStatusCodes.OK).json(responseHandler(
        { data: { users: list, counts } },
      ));
    } catch (error) {
      return next(new ErrorHandler(httpStatusCodes.INTERNAL_SERVER, error));
    }
  },

  async one(req, res, next) {
    const { id } = req.params;

    const user = await userServices.getById({ id });
    if (!user || user.error) return next(new ErrorHandler(httpStatusCodes.NOT_FOUND, 'User not exist'));

    return res.status(httpStatusCodes.OK).json(responseHandler(
      {
        data: {
          user,
        },
      },
    ));
  },

};

export default getUsers;
