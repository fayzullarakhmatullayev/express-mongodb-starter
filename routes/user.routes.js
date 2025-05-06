import { Router } from 'express';
import { User } from '../models/user.model.js';
import { validateFields } from '../utils/validateFields.js';
import { createError } from '../utils/createError.js';
import { HTTP_STATUS_CODES } from '../constants/httpStatusCodes.js';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(HTTP_STATUS_CODES.OK).json(users);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw createError(HTTP_STATUS_CODES.BAD_REQUEST, 'User ID is required');
    }

    const user = await User.findById(id);

    if (!user) {
      throw createError(HTTP_STATUS_CODES.NOT_FOUND, 'User not found');
    }

    res.status(HTTP_STATUS_CODES.OK).json(user);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    validateFields(req.body, ['firstName', 'lastName', 'email']);

    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      throw createError(HTTP_STATUS_CODES.BAD_REQUEST, 'Email already exists');
    }

    const user = await User.create(req.body);
    res.status(HTTP_STATUS_CODES.CREATED).json(user);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email } = req.body;

    if (!id) {
      throw createError(HTTP_STATUS_CODES.BAD_REQUEST, 'User ID is required');
    }

    validateFields(req.body, ['firstName', 'lastName', 'email']);

    const existingUser = await User.findOne({ email, _id: { $ne: id } });
    if (existingUser) {
      throw createError(HTTP_STATUS_CODES.BAD_REQUEST, 'Email already exists');
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { firstName, lastName, email },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      throw createError(HTTP_STATUS_CODES.NOT_FOUND, 'User not found');
    }

    res.status(HTTP_STATUS_CODES.OK).json(updatedUser);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw createError(HTTP_STATUS_CODES.BAD_REQUEST, 'User ID is required');
    }

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      throw createError(HTTP_STATUS_CODES.NOT_FOUND, 'User not found');
    }

    res.status(HTTP_STATUS_CODES.OK).json({ message: 'User deleted successfully' });
  } catch (error) {
    next(error);
  }
});

export default router;
