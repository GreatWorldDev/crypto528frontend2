import { Request, Response } from 'express';
import HttpStatus from 'http-status';
import Joi from 'joi';

const logIn = async (req: Request, res: Response, next: () => void) => {
  try {
    const schema = Joi.object({
      address: Joi.string().required().label('address'),
      type: Joi.string().required().label('type'),
      signature: Joi.string().required().label('signature'),
      token: Joi.string().required().label('token'),
    });
    const { error } = schema.validate(req.body);

    if (error) {
      res.status(HttpStatus.BAD_REQUEST).json(error.details[0].message);
      return;
    }
    next();
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
  }
};

export const AuthValidator = { logIn };
