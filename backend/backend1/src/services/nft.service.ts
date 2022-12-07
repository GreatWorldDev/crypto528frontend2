import { getConnection, getManager, getRepository, ILike, LessThanOrEqual, MoreThanOrEqual, Equal, Not, Brackets } from 'typeorm';
import { CreateNftDto } from '../dtos/nft/nft.dto';
import { NFTSearchRequestDto } from '../dtos/nft/nftsearchrequest.dto';
import { NFT } from '../database/entities/nft.entity';
import { NFTFollow } from '../database/entities/nftfollow.entity';
import { User } from '../database/entities/user.entity';
import { Trait } from '../database/entities/trait.entity';
import { Bid } from '../database/entities/bid.entity';
import { isLast } from '../utils/util';

const find = async (params: NFTSearchRequestDto): Promise<[NFT[], number]> => {
  const sort = `nft.${params.sortType.split('.')[0]}`;
  const order = params.sortType.split('.')[1].toLowerCase() === 'desc' ? 'DESC' : 'ASC';
  const skip = params.page * params.size;
  const take = params.size;
  const keyword = params.keyword || '';
  const category = params.category;
  const query = getRepository(NFT)
    .createQueryBuilder('nft')
    .leftJoinAndSelect('nft.creator', 'user')
    .leftJoinAndSelect('nft.owner', 'users')
    .leftJoinAndSelect('nft.auctionInfo', 'auction', 'auction.status = :status', { status: 'ALIVE' })
    .where(
      new Brackets(qb => {
        qb.where({ title: ILike(`%${keyword}%`) }).orWhere({ description: ILike(`%${keyword}%`) });
      }),
    );
  if (category) {
    query.andWhere({ description: category });
  }
  switch (params.isSale) {
    case 0:
      query.andWhere({ isSale: 0 });
      break;
    case 1:
      query.andWhere({ isSale: Not(0) });
      break;
    case 2:
      query.andWhere({ isSale: Not(0) });
      // query.andWhere(
      //   `CURRENT_TIMESTAMP BETWEEN auction.auctionStartTime AND (auction.auctionStartTime + auction.auctionLength * INTERVAL '1 second')`,
      // );
      break;
    case 3:
      query.andWhere({ isSale: 2 });
      break;
  }
  if (params.minPrice !== undefined) {
    query.andWhere({ price: MoreThanOrEqual(params.minPrice) });
  }
  if (params.maxPrice !== undefined) {
    query.andWhere({ price: LessThanOrEqual(params.maxPrice) });
  }
  const nfts = await query.orderBy(`${sort}`, `${order}`).skip(skip).take(take).getManyAndCount();

  if (!isLast(nfts[1], skip, take)) {
    nfts[1] = 0;
  } else {
    nfts[1] = 1;
  }
  return nfts;
};

const findAll = async (): Promise<NFT[]> => {
  const nfts: NFT[] = await getManager().getRepository(NFT).find();
  return nfts;
};

const findById = async (id: string): Promise<NFT | undefined> => {
  const nftData: NFT | undefined = await getRepository(NFT).findOne({
    where: {
      tokenId: id,
    },
    relations: ['creator', 'owner'],
  });

  return nftData;
};

const findByUser = async (user: User, skip: number, take: number, userType: string = 'creator'): Promise<[NFT[], number]> => {
  if (userType !== 'creator') {
    userType = 'owner';
  }
  const nfts = await getRepository(NFT).findAndCount({
    where: {
      [userType]: { id: user.id },
    },
    relations: ['creator', 'owner'],
    skip,
    take,
  });
  if (!isLast(nfts[1], skip, take)) {
    nfts[1] = 0;
  } else {
    nfts[1] = 1;
  }
  return nfts;
};

const findOnSale = async (owner: User, skip: number, take: number): Promise<[NFT[], number]> => {
  const nfts = await getRepository(NFT).findAndCount({
    where: {
      owner: { id: owner.id },
      isSale: Not(0),
    },
    relations: ['creator', 'owner'],
    skip,
    take,
  });
  if (!isLast(nfts[1], skip, take)) {
    nfts[1] = 0;
  } else {
    nfts[1] = 1;
  }
  return nfts;
};

const findOnBid = async (user: User, skip: number, take: number): Promise<[NFT[], number]> => {
  const bids = await getRepository(Bid)
    .createQueryBuilder('bid')
    .leftJoin('bid.user', 'user')
    .leftJoin('bid.auction', 'auction')
    .leftJoinAndSelect('bid.token', 'token')
    .leftJoinAndSelect('token.creator', 'creator')
    .leftJoinAndSelect('token.owner', 'owner')
    .where('user.id = :id', { id: user.id })
    .andWhere('auction.status = :status', { status: 'ALIVE' })
    .orderBy('bid.time', 'DESC')
    .skip(skip)
    .take(take)
    .getManyAndCount();
  if (!isLast(bids[1], skip, take)) {
    bids[1] = 0;
  } else {
    bids[1] = 1;
  }
  const nftIds: string[] = [];
  const nfts: NFT[] = [];
  for (const bid of bids[0]) {
    if (!nftIds.includes(bid.token.tokenId)) {
      nftIds.push(bid.token.tokenId);
      nfts.push(bid.token);
    }
  }

  return [nfts, bids[1]];
};

const findOnCollection = async (): Promise<NFT[]> => {
  // get the top five collection's title
  const collections: string[] = (
    await getRepository(NFT)
      .createQueryBuilder('nft')
      .select('"nft"."collection"')
      .groupBy('"nft"."collection"')
      .orderBy('COUNT(nft.id)', 'DESC')
      .skip(0)
      .take(5)
      .getRawMany()
  ).map(nft => {
    return nft.collection;
  });
  // get the top followerCount nft for every collections
  const nfts: NFT[] = [];
  for (const collection of collections) {
    const nft: NFT | undefined = await getRepository(NFT)
      .createQueryBuilder('nft')
      .leftJoinAndSelect('nft.creator', 'user')
      .leftJoinAndSelect('nft.owner', 'users')
      .where('nft.collection = :collection', { collection })
      .orderBy('nft.followerCount', 'DESC')
      .take(1)
      .getOne();
    if (nft) {
      nfts.push(nft);
    }
  }
  return nfts;
};

const create = async (data: CreateNftDto, creator: User, owner: User): Promise<NFT> => {

  const nftData = new NFT();
  nftData.tokenId = data.tokenId;
  nftData.creator = creator;
  nftData.owner = owner;
  nftData.title = data.title;
  nftData.description = data.description;
  nftData.image = data.image;
  nftData.price = data.price;
  nftData.tokenURI = data.tokenURI;
  nftData.isSale = data.isSale;
  nftData.currencyType = data.currencyType;

  const createdData: NFT = await getManager().save(nftData);
  return createdData;
};

const save = async (token: NFT): Promise<NFT> => {
  const savedToken = await getManager().save(token);
  return savedToken;
};

const follow = async (token: NFT, user: User): Promise<void> => {
  const followNft = new NFTFollow();
  followNft.token = token;
  followNft.user = user;

  token.followerCount += 1;
  await getConnection().getRepository(NFT).save(token);
  await getConnection().getRepository(NFTFollow).save(followNft);
};

const unfollow = async (token: NFT, user: User): Promise<void> => {
  const unfollowNft = new NFTFollow();
  unfollowNft.token = token;
  unfollowNft.user = user;

  token.followerCount -= 1;
  await getConnection().getRepository(NFT).save(token);
  await getConnection()
    .createQueryBuilder()
    .delete()
    .from(NFTFollow)
    .where('user_id = :userId', { userId: user.id })
    .andWhere('token_id = :tokenId', { tokenId: token.tokenId })
    .execute();
};

const isFollow = async (token: NFT, user: User): Promise<boolean> => {
  const followNFT = await getRepository(NFTFollow).findOne({
    where: {
      token: { tokenId: token.tokenId },
      user: { id: user.id },
    },
  });
  return followNFT ? true : false;
};

const getFollowers = async (token: NFT, skip: number, take: number): Promise<User[] | undefined> => {
  const followUsers = await getRepository(NFTFollow).find({
    where: {
      token: { tokenId: token.tokenId },
    },
    relations: ['user'],
    skip,
    take,
  });

  const followers: User[] = followUsers.map(followUser => followUser.user);
  return followers;
};

const getTraits = async (token: NFT): Promise<Trait[] | undefined> => {
  const traits = await getRepository(Trait).find({
    select: ['key', 'value'],
    where: {
      token: { tokenId: token.tokenId },
    },
  });
  return traits;
};

export const NFTService = {
  find,
  findAll,
  findById,
  findByUser,
  findOnSale,
  findOnBid,
  findOnCollection,
  create,
  save,
  follow,
  unfollow,
  isFollow,
  getFollowers,
  getTraits,
};
