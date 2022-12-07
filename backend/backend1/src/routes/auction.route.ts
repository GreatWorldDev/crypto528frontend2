import { Router } from 'express';
import { Routes } from '../interfaces/routes/routes.interface';
import { authMiddleware } from '../middlewares/auth.middleware';
import { AuctionValidator } from '../middlewares/validators/auction.validator';
import { AuctionController } from '../controllers/auction.controller';

const path: string = '/auction';
const router: Router = Router();

router.route(`${path}`).put(authMiddleware, AuctionValidator.create, AuctionController.create);
router.route(`${path}/:id`).get(authMiddleware, AuctionValidator.get, AuctionController.get);
router.route(`${path}/update`).post(authMiddleware, AuctionValidator.update, AuctionController.update);
router.route(`/search${path}`).get(authMiddleware, AuctionValidator.search, AuctionController.search);

export const AuctionRoute: Routes = { path, router };
