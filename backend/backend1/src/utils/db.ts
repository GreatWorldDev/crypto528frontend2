import { CreateAuctionDto } from '../dtos/auction/auction.dto';
import { CreateNftDto } from '../dtos/nft/nft.dto';
import { UpdateAuctionDto } from '../dtos/auction/auctionupdate.dto';
import { AuctionService } from '../services/auction.service';
import { NFTService } from '../services/nft.service';
import { UserService } from '../services/user.service';
import { Auction } from '../database/entities/auction.entity';
import { Bid } from '../database/entities/bid.entity';

const saveNFT = async (nftData: CreateNftDto) => {
  const token = await NFTService.findById(nftData.tokenId);
  if (!token) {
    return 'Token Already Exists!';
  }
  let creator = await UserService.findByAddress(nftData.creatorAddress);
  if (!creator)
    creator = await UserService.create(nftData.creatorAddress);
  let owner = await UserService.findByAddress(nftData.ownerAddress);

  if (!owner) owner = await UserService.create(nftData.ownerAddress);

  token.creator = creator;
  token.owner = owner;
  token.price = nftData.price;
  token.tokenURI = nftData.tokenURI;
  token.isSale = nftData.isSale;
  token.currencyType = nftData.currencyType;


  await NFTService.save(token);
  return 'Success';
};

// const dataEntry = async (nftData: CreateNftDto) => {
//   const token = await NFTService.findById(nftData.tokenId);
//   if (token) {
//     return 'Token Already Exists!';
//   }
//   // if (!creator || !owner) {
//   //   return 'Creator or Owner not exist!';
//   // }
//   await NFTService.create(nftData, null, null);
//   return 'Success';
// };

const saveAuction = async (auctionDto: CreateAuctionDto) => {
  const token = await NFTService.findById(auctionDto.tokenId);
  const user = await UserService.findByAddress(auctionDto.creatorAddress);

  if (!token || !user) {
    return 'Token or User Not Found';
  }

  let auction = await AuctionService.findByToken(token, 'ALIVE');
  if (auction) {
    return 'Auction Already Exists';
  }

  console.log('============', auctionDto)

  token.isSale = 1;
  token.price = auctionDto.currentPrice;
  auction = new Auction();
  auction.token = token;
  auction.auctionCreator = user;
  auction.auctionLength = auctionDto.length;
  auction.auctionStartTime = auctionDto.startTime;
  auction.currentPrice = auctionDto.currentPrice;
  auction.status = 'ALIVE';

  const data: Auction | undefined = await AuctionService.save(auction);
  await NFTService.save(token);
  return 'Success';
};

const updateAuction = async (auctionDto: UpdateAuctionDto) => {
  const token = await NFTService.findById(auctionDto.tokenId);
  if (!token) {
    return 'NFT Not Found';
  }

  let auction = await AuctionService.findByToken(token, 'ALIVE');
  if (!auction) {
    return 'Auction Not Found';
  }

  if (auctionDto.status === 'ALIVE') {
    const user = await UserService.findByAddress(auctionDto.creatorAddress);
    if (!user) {
      return 'User Not Found';
    }
    auction.lastBidder = user;
    auction.currentPrice = auctionDto.amount;
    auction.auctionLength = auctionDto.duration;
    token.isSale = 2;
    token.price = auctionDto.amount;
  } else if (auctionDto.status === 'END') {
    token.isSale = 0;
    token.owner = auction.lastBidder;
  } else if (auctionDto.status === 'CANCEL') {
    token.isSale = 0;
  }
  auction.status = auctionDto.status;
  auction = await AuctionService.save(auction);
  await NFTService.save(token);

  let bid = new Bid();
  if (auction.status === 'ALIVE') {
    const addressObject = await UserService.getAddressObject(auctionDto.creatorAddress);
    if (!addressObject) {
      return 'Address Not Found';
    }
    bid.address = addressObject;
    bid.user = addressObject.user;
    bid.auction = auction;
    bid.token = token;
    bid.price = auctionDto.amount;
    bid.transaction = auctionDto.transaction;
    bid = await AuctionService.saveBid(bid);
  }
  return 'Success';
};

export const DBUtil = { saveNFT, saveAuction, updateAuction };
