import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import { Routes } from '../interfaces/routes/routes.interface';
import { UsersValidator } from '../middlewares/validators/user.validator';
import { UserController } from '../controllers/user.controller';

const path: string = '/user';
const router: Router = Router();

router.route(`${path}`).put(authMiddleware, UsersValidator.save, UserController.save); // save user's profile info
router.route(`${path}/:id`).put(authMiddleware, UserController.verifyUser); // save user's profile info
router.route(`${path}/referral/:id`).put(authMiddleware, UserController.addReferralCode); // save user's profile info
router.route(`${path}/:id`).get(UsersValidator.get, UserController.get); // get detail profile info
router.route(`${path}/follow`).post(authMiddleware, UsersValidator.follow, UserController.follow); // follow or unfollow the other artists/users
router.route(`${path}/:id/isFollow`).get(authMiddleware, UsersValidator.get, UserController.isFollow); // check if current user follows :id-user or not
router.route(`${path}/:id/followings`).get(UsersValidator.getFollows, UserController.getFollowings); // get the artists/users list :id-user is following
router.route(`${path}/:id/followers`).get(UsersValidator.getFollows, UserController.getFollowers); // get the :id-user's followers list
router.route(`/search${path}`).get(UsersValidator.search, UserController.search); // search the artists/users

export const UsersRoute: Routes = { path, router };
