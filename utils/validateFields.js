import { HTTP_STATUS_CODES } from '../constants/httpStatusCodes.js';

export const validateFields = (fields, requiredFields) => {
  const missingFields = requiredFields.filter((field) => !fields[field]);

  if (missingFields.length > 0) {
    const error = new Error(`Missing required fields: ${missingFields.join(', ')}`);
    error.statusCode = HTTP_STATUS_CODES.BAD_REQUEST;
    throw error;
  }
};
