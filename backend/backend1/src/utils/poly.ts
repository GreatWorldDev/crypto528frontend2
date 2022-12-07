import config from 'config';
import https from 'https';
import axios, { AxiosResponse } from 'axios';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import { Contract } from 'web3-eth-contract';
import { CreateNftDto } from '../dtos/nft/nft.dto';
import { CreateAuctionDto } from '../dtos/auction/auction.dto';
import { UpdateAuctionDto } from '../dtos/auction/auctionupdate.dto';
import tokenInfterface from '../../myToken.json';
import { DBUtil } from './db';
import { isMinted } from './util';
import { logger } from './logger';

const decimal: number = config.get('decimal');

const options = {
  reconnect: {
    auto: true,
    delay: 5000,
    maxAttempts: 5,
    onTimeout: false,
  },
};

const provider = new Web3.providers.WebsocketProvider(process.env.POLYGON_NET || config.get('ethMainNet'), options);
const web3 = new Web3(provider);
let ethContract: Contract | null = null;

const initialize = async () => {
  // try {
  //   for (let index = 1;index < 529;index++) {
  //     const nftData: CreateNftDto = new CreateNftDto();
  //     nftData.tokenId = index.toString();
  //     nftData.tokenURI = `https://528holdings.mypinata.cloud/ipfs/Qmdxz4pe6V5XvXNrN41S7Kdwh8fcU317SPMHk7s2pXDiiR/${index}.JSON`;
  //     nftData.isSale = 0;
  //     const metaData: AxiosResponse = await axios.get(nftData.tokenURI, { httpsAgent: new https.Agent({ keepAlive: true }) });
  //     nftData.title = metaData.data.name;
  //     nftData.description = metaData.data.description;
  //     nftData.image = metaData.data.image;
  //     console.log(nftData)
  //     const response = await DBUtil.dataEntry(nftData);
  //     console.log('done', response)
  //   }
  // } catch (err: any) {
  //   console.log('err:', err)
  // }

  const ETH_ABI = tokenInfterface as AbiItem[];
  const ETH_ADDRESS: string = process.env.DEPLOY_ADDRESS || config.get('deployedAddress');
  ethContract = new web3.eth.Contract(ETH_ABI, ETH_ADDRESS);
  console.log(ethContract)
};

const subscribe = async () => {
  if (ethContract) {
    ethContract.events
      .Minted({})
      .on('data', async (data: any) => {
        await setNFTData(data.returnValues);
      })
      .on('error', (error: any) => {
        logger.log(error);
      });
    ethContract.events
      .AuctionCreated({})
      .on('data', async (data: any) => {
        await setAuction(data.returnValues);
      })
      .on('error', (error: any) => {
        logger.log(error);
      });
    ethContract.events
      .AuctionCanceled({})
      .on('data', async (data: any) => {
        await updateAuction(data, 'AuctionCanceled');
      })
      .on('error', (error: any) => {
        logger.log(error);
      });
    ethContract.events
      .AuctionEnded({})
      .on('data', async (data: any) => {
        await updateAuction(data, 'AuctionEnded');
      })
      .on('error', (error: any) => {
        logger.log(error);
      });
    ethContract.events
      .AuctionBid({})
      .on('data', async (data: any) => {
        await updateAuction(data, 'AuctionBid');
      })
      .on('error', (error: any) => {
        logger.log(error);
      });
  }
};

const start = async () => {
  await initialize();
  subscribe();
};

const setNFTData = async (data: any) => {
  try {
    console.log('nftData: ===========================', data)
    const nftData: CreateNftDto = new CreateNftDto();

    nftData.creatorAddress = data.minter;
    nftData.ownerAddress = data.minter;
    nftData.tokenId = data.nftID;
    nftData.tokenURI = data.uri;
    nftData.isSale = data.status ? 1 : 0;
    nftData.price = data.price / decimal;
    nftData.currencyType = data.currencyType;
    const metaData: AxiosResponse = await axios.get(nftData.tokenURI, { httpsAgent: new https.Agent({ keepAlive: true }) });
    nftData.title = metaData.data.title;
    nftData.description = metaData.data.description;
    nftData.image = metaData.data.image;
    const response = await DBUtil.saveNFT(nftData);
    logger.log('Minted', response);
  } catch (error) {
    logger.error(error);
  }
};

const setAuction = async (data: any) => {
  try {
    console.log('auction created==========', data)
    const isExisted = await isMinted(data.tokenId);
    if (isExisted) {
      const auctionDto: CreateAuctionDto = new CreateAuctionDto();
      auctionDto.tokenId = data.tokenId;
      auctionDto.creatorAddress = data.Creator;
      auctionDto.type = 'polygon';
      auctionDto.length = data.duration;
      auctionDto.startTime = new Date(data.auctionStart * 1000);
      auctionDto.currentPrice = data.reservePrice / decimal;
      const response = await DBUtil.saveAuction(auctionDto);
      logger.log('AuctionCreated', response);
    }
  } catch (error) {
    logger.error(error);
  }
};

const updateAuction = async (data: any, eventName: string) => {
  try {
    const updateAuctionDto: UpdateAuctionDto = new UpdateAuctionDto();
    updateAuctionDto.tokenId = data.returnValues.tokenId;
    updateAuctionDto.creatorAddress = data.returnValues.sender;
    updateAuctionDto.amount = data.returnValues.value / decimal;
    updateAuctionDto.duration = data.returnValues.duration;
    updateAuctionDto.type = 'polygon';
    updateAuctionDto.transaction = (process.env.POLYGON_URL || config.get('ethUrl')) + data.transactionHash;
    if (eventName === 'AuctionCanceled') {
      updateAuctionDto.status = 'CANCEL';
    } else if (eventName === 'AuctionEnded') {
      updateAuctionDto.status = 'END';
    } else if (eventName === 'AuctionBid') {
      updateAuctionDto.status = 'ALIVE';
    }
    const response = await DBUtil.updateAuction(updateAuctionDto);
    logger.log('UpdateAuction', response);
  } catch (error) {
    logger.error(error);
  }
};

export const PolyUtil = { start };
