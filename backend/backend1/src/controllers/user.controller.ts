import { Request, Response } from 'express';
import HttpStatus from 'http-status';
import { UserService } from '../services/user.service';
import { UserFollowsRequest } from '../dtos/users/userfollowsrequest.dto';
import { UserSearchRequest } from '../dtos/users/usersearchrequest.dto';

const get = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await UserService.findById(id);
    if (!user) {
      res.status(HttpStatus.NOT_FOUND).json({ message: 'User Not Found' });
      return;
    }

    const data = {
      ...user,
      created: new Date(user.created).getTime(),
      followingCount: await UserService.getFollowingCount(user),
      followerCount: await UserService.getFollowerCount(user),
      followers: await UserService.getFollowers(user, 0, 5),
      followings: await UserService.getFollowings(user, 0, 5),
      address: await UserService.getAddressesByUser(user),
    };

    res.status(HttpStatus.OK).send({ data });
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
  }
};

const save = async (req: Request, res: Response) => {
  try {
    const user = res.locals.user;
    const { userName, nickName, bio, avatarImage, coverImage, websiteUrl, discordUrl, facebookUrl, instagramUrl, twitterUrl, verified = false } = req.body;
    user.userName = userName;
    user.nickName = nickName;
    user.bio = bio;
    user.avatarImage = avatarImage;
    user.coverImage = coverImage;
    user.websiteUrl = websiteUrl;
    user.discordUrl = discordUrl;
    user.facebookUrl = facebookUrl;
    user.instagramUrl = instagramUrl;
    user.twitterUrl = twitterUrl;

    const updateUser = await UserService.save(user);
    res.status(HttpStatus.OK).json({ ...updateUser, created: new Date(updateUser.created).getTime() });
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
  }
};

const verifyUser = async (req: Request, res: Response) => {
  try {
    const user = await UserService.findById(req.params.id);
    console.log(req.params.id, user)
    if (user) {
      user.verified = true;
      const updatedUser = await UserService.save(user);
      res.status(HttpStatus.OK).json(updatedUser);
    } else {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'User does not exist' });
    }
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
  }
}

const addReferralCode = async (req: Request, res: Response) => {
  try {
    const { referralCode } = req.body
    if (!referralCode) {
      res.status(HttpStatus.BAD_REQUEST).json({ message: 'Referral code does not given!' });
      return;
    }
    const user = await UserService.findById(req.params.id);
    if (user) {
      user.referralCode = referralCode;
      const updatedUser = await UserService.save(user);
      res.status(HttpStatus.OK).json(updatedUser);
    } else {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'User does not exist' });
    }
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
  }
}

const follow = async (req: Request, res: Response) => {
  try {
    const user = res.locals.user;
    const { followingId } = req.body;
    const following = await UserService.findById(followingId);
    if (!following) {
      res.status(HttpStatus.NOT_FOUND).json({ message: 'Following User Not Found' });
      return;
    }
    const isFollowed = await UserService.isFollow(user, following);
    if (!isFollowed) {
      await UserService.follow(user, following);
    } else {
      await UserService.unfollow(user, following);
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
    const following = await UserService.findById(id);
    if (!following) {
      res.status(HttpStatus.NOT_FOUND).json({ message: 'NFT Not Found' });
      return;
    }
    const status = await UserService.isFollow(user, following);
    res.status(HttpStatus.OK).json({ status });
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
  }
};

const getFollowings = async (req: Request, res: Response) => {
  try {
    const { id, page, size } = res.locals.normalizedBody as UserFollowsRequest;
    const user = await UserService.findById(id);
    const skip = page * size;
    if (!user) {
      res.status(HttpStatus.NOT_FOUND).json({ message: 'User Not Found' });
      return;
    }

    const data = await UserService.getFollowings(user, skip, size);
    const total = await UserService.getFollowingCount(user);
    res.status(HttpStatus.OK).json({ data, total });
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
  }
};

const getFollowers = async (req: Request, res: Response) => {
  try {
    const { id, page, size } = res.locals.normalizedBody as UserFollowsRequest;
    const user = await UserService.findById(id);
    const skip = page * size;
    if (!user) {
      res.status(HttpStatus.NOT_FOUND).json({ message: 'User Not Found' });
      return;
    }

    const data = await UserService.getFollowers(user, skip, size);
    const total = await UserService.getFollowerCount(user);
    res.status(HttpStatus.OK).send({ data, total });
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
  }
};

const search = async (req: Request, res: Response) => {
  try {
    const { keyword, sortType, page, size } = res.locals.normalizedBody as UserSearchRequest;
    const skip = page * size;
    const users = await UserService.find(keyword, sortType, skip, size);
    const data = [];
    if (users) {
      for (let i = 0;i < users?.length;i++) {
        const followerCount = await UserService.getFollowerCount(users[i]);
        data[i] = { ...users[i], created: new Date(users[i].created).getTime(), followerCount };
      }
    }
    res.status(HttpStatus.OK).send({ data });
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
  }
};

export const UserController = { save, get, follow, isFollow, getFollowings, getFollowers, search, verifyUser, addReferralCode };
