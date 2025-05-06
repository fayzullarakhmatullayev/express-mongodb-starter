import { HTTP_STATUS_CODES } from '../constants/httpStatusCodes.js';

export const errorMiddleware = async (err, req, res, next) => {
  const statusCode = err.statusCode || res.statusCode || HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR;
  res.status(statusCode).json({
    statusCode,
    message: err.message || 'Internal Server Error'
  });
};
