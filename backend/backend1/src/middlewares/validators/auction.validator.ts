import { Request, Response } from 'express';
import Joi from 'joi';
import HttpStatus from 'http-status';
import { plainToClass } from 'class-transformer';
import { AuctionUpdateRequest } from '../../dtos/auction/auctionupdaterequest.dto';
import { AuctionSearchRequest } from '../../dtos/auction/auctionsearchrequest.dto';

const create = async (req: Request, res: Response, next: () => void) => {
  try {
    const schema = Joi.object({
      tokenId: Joi.string().required().label('tokenId'),
      creatorAddress: Joi.string().required().label('creatorAddress'),
      type: Joi.string().required().label('type'),
      length: Joi.number().required().label('length'),
      startTime: Joi.date().required().label('startTime'),
      currentPrice: Joi.date().required().label('currentPrice'),
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

const update = async (req: Request, res: Response, next: () => void) => {
  try {
    const schema = Joi.object({
      tokenId: Joi.string().required().label('tokenId'),
      status: Joi.string().required().label('status'),
      address: Joi.string().optional().label('address'),
      type: Joi.string().optional().label('type'),
      amount: Joi.number().optional().label('amount'),
    });

    const { value, error } = schema.validate(req.body);
    if (error) {
      res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({ message: error.details[0].message });
      return;
    }
    res.locals.normalizedBody = plainToClass(AuctionUpdateRequest, value);
    next();
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
  }
};

const search = async (req: Request, res: Response, next: () => void) => {
  try {
    const schema = Joi.object({
      keyword: Joi.string().allow('').required().label('keyword'),
      filter: Joi.string().allow('').required().label('filter'),
      sortType: Joi.string().allow('').required().label('sortType'),
      page: Joi.number().required().label('page'),
      size: Joi.number().required().label('size'),
    });
    const { value, error } = schema.validate(req.query);
    if (error) {
      res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({ message: error.details[0].message });
      return;
    }
    res.locals.normalizedBody = plainToClass(AuctionSearchRequest, value);
    next();
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
  }
};

export const AuctionValidator = { create, get, update, search };
