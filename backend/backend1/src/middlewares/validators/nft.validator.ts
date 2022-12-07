import { plainToClass } from 'class-transformer';
import { Request, Response } from 'express';
import HttpStatus from 'http-status';
import Joi from 'joi';
import { NFTFollowsRequestDto } from '../../dtos/nft/nftfollowsrequest.dto';
import { NFTSearchRequestDto } from '../../dtos/nft/nftsearchrequest.dto';
import { NFTsRequestDto } from '../../dtos/nft/nftsrequest.dto';
import { NFTTagRequestDto } from '../../dtos/nft/nfttagrequest.dto';

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

const getNFTs = async (req: Request, res: Response, next: () => void) => {
  try {
    const schema = Joi.object({
      userId: Joi.string().required().label('userId'),
      page: Joi.number().required().label('page'),
      size: Joi.number().required().label('size'),
      userType: Joi.string().allow(null).optional().label('userType'),
    });
    const { value, error } = schema.validate({ ...req.query, ...req.params });

    if (error) {
      res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({ message: error.details[0].message });
    }
    res.locals.normalizedBody = plainToClass(NFTsRequestDto, value);
    next();
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
  }
};

const follow = async (req: Request, res: Response, next: () => void) => {
  try {
    const schema = Joi.object({
      tokenId: Joi.string().required().label('tokenId'),
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
    res.locals.normalizedBody = plainToClass(NFTFollowsRequestDto, value);
    next();
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
  }
};

const update = async (req: Request, res: Response, next: () => void) => {
  try {
    const schema = Joi.object({
      id: Joi.string().required().label('id'),
      tags: Joi.array().required().label('tags'),
    });
    const { value, error } = schema.validate(req.body);
    if (error) {
      res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({ message: error.details[0].message });
      return;
    }
    res.locals.normalizedBody = plainToClass(NFTTagRequestDto, value);
    next();
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
  }
};

const search = async (req: Request, res: Response, next: () => void) => {
  try {
    const schema = Joi.object({
      sortType: Joi.string().required().label('sortType'),
      page: Joi.number().required().label('page'),
      size: Joi.number().required().label('size'),
      keyword: Joi.string().optional().label('keyword'),
      category: Joi.string().optional().label('category'),
      isSale: Joi.number().optional().label('isSale'),
      maxPrice: Joi.number().optional().label('maxPrice'),
      minPrice: Joi.number().optional().label('minPrice'),
      collection: Joi.string().optional().label('collection'),
    });
    const { value, error } = schema.validate(req.query);
    if (error) {
      res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({ message: error.details[0].message });
      return;
    }
    res.locals.normalizedBody = plainToClass(NFTSearchRequestDto, value);
    next();
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
  }
};

export const NFTValidator = { get, getNFTs, follow, getFollows, update, search };
