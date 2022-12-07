import { getManager, getRepository } from 'typeorm';
import { Auction } from '../database/entities/auction.entity';
import { NFT } from '../database/entities/nft.entity';
import { Bid } from '../database/entities/bid.entity';

const find = async (keyword: string, filter: string, sortType: string, skip: number, take: number): Promise<Auction[] | undefined> => {
  const sort = sortType.split('.')[0];
  const order = sortType.split('.')[1] === 'desc' ? 'DESC' : 'ASC';
  const option = filter.split('=')[0];
  const value = filter.split('=')[1] || '';

  const auctions = await getManager()
    .getRepository(Auction)
    .createQueryBuilder('auction')
    .where(`auction.status ILIKE '%${keyword}%'`)
    .andWhere(`${option} = ${value}`)
    .orderBy(`${sort}`, `${order}`)
    .skip(skip)
    .take(take)
    .getMany();

  return auctions;
};

const findById = async (auctionId: string): Promise<Auction | undefined> => {
  const findAuction: Auction | undefined = await getRepository(Auction).findOne({
    where: { id: auctionId },
    relations: ['token', 'auctionCreator', 'lastBidder'],
  });
  return findAuction;
};

const findByToken = async (token: NFT, status: string): Promise<Auction | undefined> => {
  const findAuction: Auction | undefined = await getRepository(Auction).findOne({
    where: { token, status },
    relations: ['token', 'auctionCreator', 'lastBidder'],
  });
  return findAuction;
};

const save = async (auction: Auction): Promise<Auction> => {
  const savedAuction = await getManager().getRepository(Auction).save(auction);
  return savedAuction;
};

const saveBid = async (bid: Bid): Promise<Bid> => {
  const savedBid = await getManager().save(bid);
  return savedBid;
};

const findBidByAuction = async (auction: Auction): Promise<Bid[] | undefined> => {
  const bids: Bid[] | undefined = await getRepository(Bid).find({
    where: { auction },
    relations: ['address', 'user'],
    order: {
      time: 'ASC',
    },
  });
  return bids;
};

const findBidByToken = async (token: NFT): Promise<Bid[] | undefined> => {
  const bids: Bid[] | undefined = await getRepository(Bid).find({
    where: { token },
    relations: ['address', 'user'],
    order: {
      time: 'ASC',
    },
  });
  return bids;
};

export const AuctionService = { find, findById, findByToken, save, findBidByAuction, findBidByToken, saveBid };
