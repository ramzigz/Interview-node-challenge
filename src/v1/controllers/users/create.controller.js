/* eslint-disable no-underscore-dangle */
import userServices from '../../services/user.services.js';
import { ErrorHandler } from '../../../utils/errorsHandler.js';
import responseHandler from '../../../utils/responseHandler.js';
import httpStatusCodes from '../../../utils/httpStatusCodes.js';

const createUser = async (req, res, next) => {
  const userData = req.body;

  const checkUserExistance = await userServices.getOneByEmail({ email: userData.email });

  if (checkUserExistance) {
    return next(
      new ErrorHandler(
        httpStatusCodes.BAD_REQUEST,
        'User with given email is already exist please try with another email',
        httpStatusCodes.EMAIL_ALREADY_USED,
      ),
    );
  }

  const user = await userServices.create({
    data: { ...userData },
  });

  if (!user || user?.error) {
    return next(
      new ErrorHandler(
        httpStatusCodes.BAD_REQUEST,
        user?.error,
      ),
    );
  }

  return res.status(httpStatusCodes.CREATED).json(responseHandler(
    {
      data: { user },
    },
  ));
};

export default createUser;
