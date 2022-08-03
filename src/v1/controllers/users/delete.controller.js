import { ErrorHandler } from '../../../utils/errorsHandler.js';
import httpStatusCodes from '../../../utils/httpStatusCodes.js';
import responseHandler from '../../../utils/responseHandler.js';
import userServices from '../../services/user.services.js';

export default async function deleteUsr(req, res, next) {
  try {
    const userId = req.params.id;

    const oldUser = await userServices.getById({ id: userId });

    if (!oldUser) {
      return next(
        new ErrorHandler(httpStatusCodes.BAD_REQUEST, 'Resource not exist'),
      );
    }

    const deleted = await userServices.deleteOne(userId);

    if (!deleted || deleted.error) {
      return next(
        new ErrorHandler(httpStatusCodes.INTERNAL_SERVER, deleted.error),
      );
    }
    return res.status(httpStatusCodes.DELETED).json(
      responseHandler({ data: { deleted }, statusCode: httpStatusCodes.OK }),
    );
  } catch (error) {
    return next(
      new ErrorHandler(httpStatusCodes.INTERNAL_SERVER, error),
    );
  }
}
