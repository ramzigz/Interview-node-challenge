import { ErrorHandler } from '../../../utils/errorsHandler.js';
import httpStatusCodes from '../../../utils/httpStatusCodes.js';
import responseHandler from '../../../utils/responseHandler.js';
import userServices from '../../services/user.services.js';

export default function update(req, res, next) {
  try {
    const { id } = req.params;
    const userData = req.body;

    const userIsExist = userServices.getById({ id });

    if (!userIsExist) {
      return next(new ErrorHandler(httpStatusCodes.NOT_FOUND, 'User not exist'));
    }

    if (userData.email) {
      const checkUserExistance = userServices.getOneByEmail({ email: userData.email });

      const currentUser = userServices.getById({ id });
      if (checkUserExistance && userData.email !== currentUser.email) {
        return next(
          new ErrorHandler(
            httpStatusCodes.BAD_REQUEST,
            'User with given email is already exist please try with another email',
            httpStatusCodes.EMAIL_ALREADY_USED,
          ),
        );
      }
    }

    const user = userServices.update({
      data: { ...userData, id }, id,
    });

    if (!user || user.error) {
      return next(
        new ErrorHandler(httpStatusCodes.INTERNAL_SERVER, user.error),
      );
    }

    return res.status(httpStatusCodes.OK).json(
      responseHandler({ data: { user }, statusCode: httpStatusCodes.OK }),
    );
  } catch (error) {
    return next(
      new ErrorHandler(httpStatusCodes.INTERNAL_SERVER, error),
    );
  }
}
