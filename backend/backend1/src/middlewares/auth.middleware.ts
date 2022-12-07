import config from 'config';
import { Request, Response } from 'express';
import HttpStatus from 'http-status';
import jwt from 'jsonwebtoken';
import { UserService } from '../services/user.service';

export const authMiddleware = async (req: Request, res: Response, next: () => void) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    const secretKey: string = config.get('secretKey');
    const decodedToken: any = token ? jwt.verify(token, secretKey || '') : null;
    const user = decodedToken ? await UserService.findById(decodedToken.id) : null;

    if (user) {
      res.locals.user = user;
      next();
    } else {
      res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Unauthorized' });
      return;
    }
  } catch (error) {
    res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Unauthorized' });
    return;
  }
};
