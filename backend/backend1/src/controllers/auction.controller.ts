import { Request, Response } from 'express';
import HttpStatus from 'http-status';
import { AuctionService } from '../services/auction.service';
import { NFTService } from '../services/nft.service';
import { UserService } from '../services/user.service';
import { Auction } from '../database/entities/auction.entity';
import { Bid } from '../database/entities/bid.entity';
import { AuctionSearchRequest } from '../dtos/auction/auctionsearchrequest.dto';
import { AuctionUpdateRequest } from '../dtos/auction/auctionupdaterequest.dto';

const create = async (req: Request, res: Response) => {
  try {
    const { tokenId, creatorAddress, type, length, startTime, currentPrice } = req.body;
    const token = await NFTService.findById(tokenId);
    const user = await UserService.findByAddress(creatorAddress);

    if (!token || !user) {
      res.status(HttpStatus.NOT_FOUND).json({ message: 'Token or User Not Found' });
      return;
    }

    let auction = await AuctionService.findByToken(token, 'ALIVE');
    if (auction) {
      res.status(HttpStatus.BAD_REQUEST).json({ message: 'Auction Already Exists' });
      return;
    }

    auction = new Auction();
    auction.token = token;
    auction.auctionCreator = user;
    auction.auctionLength = length;
    auction.auctionStartTime = startTime;
    auction.currentPrice = currentPrice;
    auction.status = 'ALIVE';

    const data: Auction | undefined = await AuctionService.save(auction);
    return res.status(HttpStatus.OK).send({ data });
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
  }
};

const get = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = await AuctionService.findById(id);
    if (!data) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: 'Auction Not Found' });
    }
    return res.status(HttpStatus.OK).send({ data, auctionStartTime: new Date(data.auctionStartTime).getTime() });
  } catch (error) {
    return res.status(HttpStatus.OK).json({ message: 'Internal Server Error' });
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const { tokenId, address, type, amount, status } = res.locals.normalizedBody as AuctionUpdateRequest;
    const token = await NFTService.findById(tokenId);
    if (!token) {
      res.status(HttpStatus.NOT_FOUND).json({ message: 'NFT Not Found' });
      return;
    }

    let auction = await AuctionService.findByToken(token, 'ALIVE');
    if (!auction) {
      res.status(HttpStatus.NOT_FOUND).json({ message: 'Auction Not Found' });
      return;
    }

    let addressType = '';
    // when any user bids, address and type be must
    if (address && type) {
      addressType = type === 'algorand' ? 'ALGO' : 'POLY';
      const user = await UserService.findByAddress(address);
      if (!user) {
        res.status(HttpStatus.NOT_FOUND).json({ message: 'User Not Found' });
        return;
      }

      auction.lastBidder = user;
      auction.currentPrice = amount;
    }
    auction.status = status;
    auction = await AuctionService.save(auction);

    let bid = new Bid();
    if (status === 'ALIVE') {
      const addressObject = await UserService.getAddressObject(address);
      if (!addressObject) {
        res.status(HttpStatus.NOT_FOUND).json({ message: 'Address Not Found' });
        return;
      }

      const user = await UserService.findByAddress(address);
      if (!user) {
        res.status(HttpStatus.NOT_FOUND).json({ message: 'User Not Found' });
        return;
      }

      bid.address = addressObject;
      bid.auction = auction;
      bid.token = token;
      bid.user = user;
    }

    bid = await AuctionService.saveBid(bid);

    res.status(HttpStatus.OK).json({ auction, bid });
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
  }
};

const search = async (req: Request, res: Response) => {
  try {
    const { keyword, filter, sortType, page, size } = res.locals.normalizedBody as AuctionSearchRequest;
    const skip = page * size;
    const auctions = await AuctionService.find(keyword, filter, sortType, skip, size);
    const data = auctions?.map(auction => {
      return { ...auction, auctionStartTime: new Date(auction.auctionStartTime).getTime() };
    });
    res.status(HttpStatus.OK).json({ data });
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
  }
};

export const AuctionController = { create, get, update, search };
