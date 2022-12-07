import { plainToClass } from 'class-transformer';
import { Request, Response } from 'express';
import HttpStatus from 'http-status';
import Joi from 'joi';
import { UserFollowsRequest } from '../../dtos/users/userfollowsrequest.dto';
import { UserSearchRequest } from '../../dtos/users/usersearchrequest.dto';

const get = async (req: Request, res: Response, next: () => void) => {
  try {
    const schema = Joi.object({
      id: Joi.string().required().label('id'),
    });
    const { error } = schema.validate(req.params);

    if (error) {
      res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({ message: error.details[0].message });
      return;
    }
    next();
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
  }
};

const save = async (req: Request, res: Response, next: () => void) => {
  try {
    const schema = Joi.object({
      userName: Joi.string().required().label('userName'),
      nickName: Joi.string().required().label('nickName'),
      bio: Joi.string().required().label('bio'),
      avatarImage: Joi.string().allow(null).optional().label('avatarImage'),
      coverImage: Joi.string().allow(null).optional().label('coverImage'),
      websiteUrl: Joi.string().allow(null).allow('').optional().label('websiteUrl'),
      discordUrl: Joi.string().allow(null).allow('').optional().label('discordUrl'),
      facebookUrl: Joi.string().allow(null).allow('').optional().label('facebookUrl'),
      instagramUrl: Joi.string().allow(null).allow('').optional().label('instagramUrl'),
      twitterUrl: Joi.string().allow(null).allow('').optional().label('twitterUrl'),
    });
    const { error } = schema.validate(req.body);

    if (error) {
      res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({ message: error.details[0].message });
      return;
    }
    next();
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
  }
};

const follow = async (req: Request, res: Response, next: () => void) => {
  try {
    const schema = Joi.object({
      followingId: Joi.string().required().label('followingId'),
    });
    const { error } = schema.validate(req.body);

    if (error) {
      res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({ message: error.details[0].message });
      return;
    }
    next();
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
  }
};

const getFollows = async (req: Request, res: Response, next: () => void) => {
  try {
    const schema = Joi.object({
      id: Joi.string().required().label('id'),
      page: Joi.number().required().label('page'),
      size: Joi.number().required().label('size'),
    });
    const { value, error } = schema.validate({ ...req.query, ...req.params });

    if (error) {
      res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({ message: error.details[0].message });
      return;
    }
    res.locals.normalizedBody = plainToClass(UserFollowsRequest, value);
    next();
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
  }
};

const search = async (req: Request, res: Response, next: () => void) => {
  try {
    const schema = Joi.object({
      keyword: Joi.string().allow(null).allow('').optional().label('keyword'),
      sortType: Joi.string().allow('').required().label('sortType'),
      page: Joi.number().required().label('page'),
      size: Joi.number().required().label('size'),
    });
    const { value, error } = schema.validate(req.query);

    if (error) {
      res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({ message: error.details[0].message });
      return;
    }

    res.locals.normalizedBody = plainToClass(UserSearchRequest, value);
    next();
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
  }
};

export const UsersValidator = { get, save, follow, getFollows, search };
