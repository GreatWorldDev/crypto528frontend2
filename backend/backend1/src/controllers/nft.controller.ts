import { Request, Response } from 'express';
import HttpStatus from 'http-status';
import { NFT } from '../database/entities/nft.entity';
import { User } from '../database/entities/user.entity';
import { NFTService } from '../services/nft.service';
import { UserService } from '../services/user.service';
import { AuctionService } from '../services/auction.service';
import { CreateNftDto } from '../dtos/nft/nft.dto';
import { NFTFollowsRequestDto } from '../dtos/nft/nftfollowsrequest.dto';
import { NFTSearchRequestDto } from '../dtos/nft/nftsearchrequest.dto';
import { NFTsRequestDto } from '../dtos/nft/nftsrequest.dto';
import { NFTTagRequestDto } from '../dtos/nft/nfttagrequest.dto';

const get = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    let data = {};
    const nftData = await NFTService.findById(id);
    if (!nftData) {
      res.status(HttpStatus.NOT_FOUND).json({ message: 'NFT Not Found' });
      return;
    }
    data = { ...nftData };
    const auctionInfo = await AuctionService.findByToken(nftData, 'ALIVE');
    if (auctionInfo) {
      const auctionStartTime = new Date(auctionInfo.auctionStartTime).getTime();
      const auctionEndTime = auctionStartTime + auctionInfo.auctionLength * 1000;
      data = { ...data, auctionInfo: { ...auctionInfo, auctionStartTime, auctionEndTime } };
    } else {
      data = { ...data, auctionInfo: null };
    }
    const bidHistory = auctionInfo ? await AuctionService.findBidByAuction(auctionInfo) : [];
    const totalHistory = await AuctionService.findBidByToken(nftData);
    const traits = await NFTService.getTraits(nftData);
    data = { ...data, bidHistory, totalHistory, traits };

    res.status(HttpStatus.OK).send({ data });
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
  }
};

const getByUser = async (req: Request, res: Response) => {
  try {
    const { userId, page, size } = res.locals.normalizedBody as NFTsRequestDto;
    const skip = page * size;
    const user = await UserService.findById(userId);
    if (!user) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: 'Specified User Not Found' });
    }

    const result = await NFTService.findByUser(user, skip, size);
    const data = [];
    const nfts = result[0];
    if (nfts) {
      for (const nft of nfts) {
        let auctionInfo = null;
        const auction = await AuctionService.findByToken(nft, 'ALIVE');
        if (auction) {
          const auctionStartTime = new Date(auction.auctionStartTime).getTime();
          const auctionLength = auction.auctionLength * 1000;
          const auctionEndTime = auctionStartTime + auctionLength;
          auctionInfo = { ...auction, auctionStartTime, auctionLength, auctionEndTime };
        }
        data.push({ ...nft, time: new Date(nft.time).getTime(), auctionInfo });
      }
    }
    res.status(HttpStatus.OK).send({ data, isLast: Boolean(result[1]) });
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
  }
};

const getOnSale = async (req: Request, res: Response) => {
  try {
    const { userId, page, size } = res.locals.normalizedBody as NFTsRequestDto;
    const skip = page * size;
    const owner = await UserService.findById(userId);
    if (!owner) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: 'Owner Not Found' });
    }
    const result = await NFTService.findOnSale(owner, skip, size);
    const nfts = result[0];
    const data = [];
    if (nfts) {
      for (const nft of nfts) {
        let auctionInfo = null;
        const auction = await AuctionService.findByToken(nft, 'ALIVE');
        if (auction) {
          const auctionStartTime = new Date(auction.auctionStartTime).getTime();
          const auctionLength = auction.auctionLength * 1000;
          const auctionEndTime = auctionStartTime + auctionLength;
          auctionInfo = { ...auction, auctionStartTime, auctionLength, auctionEndTime };
        }
        data.push({ ...nft, time: new Date(nft.time).getTime(), auctionInfo });
      }
    }
    res.status(HttpStatus.OK).send({ data, isLast: Boolean(result[1]) });
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
  }
};

const getOnBid = async (req: Request, res: Response) => {
  try {
    const { userId, page, size } = res.locals.normalizedBody as NFTsRequestDto;
    const skip = page * size;
    const user = await UserService.findById(userId);
    if (!user) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: 'Specified User Not Found' });
    }
    const result = await NFTService.findOnBid(user, skip, size);
    const nfts = result[0];
    const data = [];
    if (nfts) {
      for (const nft of nfts) {
        let auctionInfo = null;
        const auction = await AuctionService.findByToken(nft, 'ALIVE');
        if (auction) {
          const auctionStartTime = new Date(auction.auctionStartTime).getTime();
          const auctionLength = auction.auctionLength * 1000;
          const auctionEndTime = auctionStartTime + auctionLength;
          auctionInfo = { ...auction, auctionStartTime, auctionLength, auctionEndTime };
        }
        data.push({ ...nft, time: new Date(nft.time).getTime(), auctionInfo });
      }
    }
    res.status(HttpStatus.OK).send({ data, isLast: Boolean(result[1]) });
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
  }
};

const getOnCollection = async (req: Request, res: Response) => {
  try {
    const data = await NFTService.findOnCollection();
    res.status(HttpStatus.OK).send({ data });
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const data: CreateNftDto = req.body;
    const token = await NFTService.findById(data.tokenId);
    if (token) {
      return res.status(HttpStatus.OK).json({ message: 'Token Already Exists' });
    }

    const creator = await UserService.findByAddress(data.creatorAddress);
    const owner = await UserService.findByAddress(data.ownerAddress);
    if (!creator || !owner) {
      res.status(HttpStatus.NOT_FOUND).json({ message: 'Creator or Owner Not Found' });
      return;
    }

    const createData: NFT = await NFTService.create(data, creator, owner);
    res.status(HttpStatus.OK).send({ data: createData });
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
  }
};

const follow = async (req: Request, res: Response) => {
  try {
    console.log(req.body)
    const user: User = res.locals.user;
    const { tokenId } = req.body;
    const token = await NFTService.findById(tokenId);
    if (!token) {
      res.status(HttpStatus.NOT_FOUND).json({ message: 'NFT Not Found' });
      return;
    }
    const isFollowed = await NFTService.isFollow(token, user);
    if (!isFollowed) {
      await NFTService.follow(token, user);
    } else {
      await NFTService.unfollow(token, user);
    }
    res.status(HttpStatus.OK).json({ status: 'Success' });
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
  }
};

const isFollow = async (req: Request, res: Response) => {
  try {
    const user = res.locals.user;
    const { id } = req.params;
    const nftData = await NFTService.findById(id);
    if (!nftData) {
      res.status(HttpStatus.NOT_FOUND).json({ message: 'NFT Not Found' });
      return;
    }
    const isFollowed = await NFTService.isFollow(nftData, user);
    res.status(HttpStatus.OK).json({ isFollowed });
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
  }
};

const getFollowers = async (req: Request, res: Response) => {
  try {
    const { id, page, size } = res.locals.normalizedBody as NFTFollowsRequestDto;
    const token = await NFTService.findById(id);
    const skip = page * size;
    if (!token) {
      res.status(HttpStatus.NOT_FOUND).json({ message: 'NFT Not Found' });
      return;
    }

    const data = await NFTService.getFollowers(token, skip, size);
    res.status(HttpStatus.OK).send({ data });
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const { id, tags } = res.locals.normalizedBody as NFTTagRequestDto;
    const token = await NFTService.findById(id);
    if (!token) {
      res.status(HttpStatus.NOT_FOUND).json({ message: 'NFT Not Found', success: false });
      return;
    }
    await NFTService.save(token);
    res.status(HttpStatus.OK).send({ success: true });
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
  }
};

const search = async (req: Request, res: Response) => {
  try {
    const params: NFTSearchRequestDto = res.locals.normalizedBody;
    const result = await NFTService.find(params);
    const nfts = result[0];
    const data = [];

    if (nfts) {
      for (let i = 0;i < nfts?.length;i++) {
        const auctionData = await AuctionService.findByToken(nfts[i], 'ALIVE');
        let auctionInfo = null;
        if (auctionData) {
          const auctionStartTime = new Date(auctionData.auctionStartTime).getTime();
          const auctionEndTime = auctionStartTime + auctionData.auctionLength * 1000;
          auctionInfo = { ...auctionData, auctionStartTime, auctionEndTime };
        }
        const time = new Date(nfts[i].time).getTime();
        data[i] = { ...nfts[i], auctionInfo, time };
      }
    }
    res.status(HttpStatus.OK).send({ data, isLast: Boolean(result[1]) });
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
  }
};

export const NFTController = {
  get,
  getByUser,
  getOnSale,
  getOnBid,
  getOnCollection,
  create,
  follow,
  isFollow,
  getFollowers,
  update,
  search,
};
