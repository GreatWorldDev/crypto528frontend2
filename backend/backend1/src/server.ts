process.env.NODE_CONFIG_DIR = __dirname + '/configs';

import 'dotenv/config';
import { App } from './app';
import { AuthRoute } from './routes/auth.route';
import { NFTRoute } from '././routes/nft.route';
import { KYCRoute } from '././routes/kyc.route';
import { UsersRoute } from './routes/user.route';
import { AuctionRoute } from './routes/auction.route';
import { validateEnv } from './utils/validateEnv';

validateEnv();

const { listen } = App([UsersRoute, AuthRoute, NFTRoute, AuctionRoute,KYCRoute]);
listen();

