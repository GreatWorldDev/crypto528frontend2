import config from 'config';
import jwt from 'jsonwebtoken';
import { User } from '../database/entities/user.entity';
import { TokenData } from '../interfaces/auth/tokendata.interface';
import { DataStoredInToken } from '../interfaces/auth/datastoredintoken.interface';

const createToken = (user: User): TokenData => {
  const dataStoredInToken: DataStoredInToken = { id: user.id };
  const secretKey: string = config.get('secretKey');
  const expiresIn: number = 30 * 24 * 60 * 60;

  return { expiresIn, token: jwt.sign(dataStoredInToken, secretKey || '', { expiresIn }) };
};

const createCookie = (tokenData: TokenData): string => {
  return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
};

export const AuthService = { createToken, createCookie };
