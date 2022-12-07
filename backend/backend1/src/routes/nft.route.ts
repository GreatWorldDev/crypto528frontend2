import { Router } from 'express';
import { NFTController } from '../controllers/nft.controller';
import { Routes } from '../interfaces/routes/routes.interface';
import { authMiddleware } from '../middlewares/auth.middleware';
import { NFTValidator } from '../middlewares/validators/nft.validator';

const path: string = '/nft';
const router: Router = Router();

router.route(`${path}/:id`).get(NFTValidator.get, NFTController.get); // get :id-nft detail info
router.route(`${path}/doneBy/:userId`).get(NFTValidator.getNFTs, NFTController.getByUser); // get nfts by creator :userId or owner :userId according to userType
router.route(`${path}/onSale/:userId`).get(NFTValidator.getNFTs, NFTController.getOnSale); // get nfts by owner :userId and on a sale
router.route(`${path}/onBid/:userId`).get(NFTValidator.getNFTs, NFTController.getOnBid); // get nfts which :userId placed a bid on
router.route(`${path}/by/collections`).get(NFTController.getOnCollection); // get famous nfts based on collection by sorting followerCount
router.route(`${path}/follow`).post(authMiddleware, NFTValidator.follow, NFTController.follow); // user follow or unfollow the :id-nft
router.route(`${path}/:id/isFollow`).get(authMiddleware, NFTValidator.get, NFTController.isFollow); // current user follow :id nft or not
router.route(`${path}/:id/followers`).get(NFTValidator.getFollows, NFTController.getFollowers); // get the followers for :id nft
router.route(`${path}/updateTags`).post(authMiddleware, NFTValidator.update, NFTController.update); // save the tags for :id nft
router.route(`/search${path}`).get(NFTValidator.search, NFTController.search); // search the nfts

export const NFTRoute: Routes = { path, router };
