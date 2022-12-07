import { getConnection, getManager, getRepository } from 'typeorm';
import { User } from '../database/entities/user.entity';
import { Follow } from '../database/entities/follow.entity';
import { Address } from '../database/entities/address.entity';

const find = async (keyword: string, sortType: string, skip: number, take: number): Promise<User[] | undefined> => {
  const sort = `user.${sortType.split('.')[0]}`;
  const order = sortType.split('.')[1] === 'desc' ? 'DESC' : 'ASC';

  const users = await getManager()
    .getRepository(User)
    .createQueryBuilder('user')
    .select()
    .where(`user.user_name ILIKE '%${keyword}%'`)
    .orWhere(`user.nickname ILIKE '%${keyword}%'`)
    .orderBy(`${sort}`, `${order}`)
    .skip(skip)
    .take(take)
    .getMany();
  return users;
};

const findById = async (userId: string): Promise<User | undefined> => {
  const findUser: User | undefined = await getManager().getRepository(User).findOne(userId);
  return findUser;
};

const findByAddress = async (account: string): Promise<User | undefined> => {
  const userData = await getRepository(Address).findOne({
    where: {
      walletAddress: account,
    },
    relations: ['user'],
  });

  return userData?.user;
};

const create = async (walletAddress: string, userName?: string): Promise<User> => {
  const user = new User();
  const address = new Address();

  user.userName = userName ? userName : walletAddress;
  const createdUser: User = await getManager().save(user);

  address.user = createdUser;
  address.walletAddress = walletAddress;
  await getManager().save(address);

  return createdUser;
};

const remove = async (userId: string): Promise<User | undefined> => {
  const findUser: User | undefined = await getManager().findOne(User, { id: userId });
  const deleteUserData = await getManager().remove(findUser);

  return deleteUserData;
};

const save = async (user: User): Promise<User> => {
  const updateUser = await getManager().save(user);
  return updateUser;
};

const follow = async (user: User, following: User): Promise<Follow> => {
  const followUser = new Follow();
  followUser.user = user;
  followUser.following = following;
  const followUserData = await getConnection().getRepository(Follow).save(followUser);
  return followUserData;
};

export const unfollow = async (user: User, unfollowing: User): Promise<void> => {
  const followUser = new Follow();
  followUser.user = user;
  followUser.following = unfollowing;

  await getConnection()
    .createQueryBuilder()
    .delete()
    .from(Follow)
    .where('user_id = :userId', { userId: user.id })
    .andWhere('following_id = :followingId', { followingId: unfollowing.id })
    .execute();
};

const isFollow = async (user: User, following: User): Promise<boolean> => {
  const followData = await getRepository(Follow).findOne({
    where: {
      user: { id: user.id },
      following: { id: following.id },
    },
  });
  return followData ? true : false;
};

const getFollowingCount = async (user: User): Promise<number> => {
  const followingCount = await getRepository(Follow).count({
    where: {
      user: { id: user.id },
    },
  });

  return followingCount;
};

const getFollowerCount = async (user: User): Promise<number> => {
  const followerCount = await getRepository(Follow).count({
    where: {
      following: { id: user.id },
    },
  });
  return followerCount;
};

const getFollowers = async (following: User, skip: number, take: number): Promise<User[]> => {
  const followUsers = await getRepository(Follow).find({
    where: {
      following: { id: following.id },
    },
    relations: ['user'],
    skip,
    take,
  });

  const followers: User[] = followUsers.map(followUser => {
    return followUser.user;
  });
  return followers;
};

const getFollowings = async (follower: User, skip: number, take: number): Promise<User[]> => {
  const followUsers = await getRepository(Follow).find({
    where: {
      user: { id: follower.id },
    },
    relations: ['following'],
    skip,
    take,
  });
  const followings: User[] = followUsers.map(followUser => {
    return followUser.following;
  });
  return followings;
};

const getAddressObject = async (address: string): Promise<Address | undefined> => {
  return getRepository(Address).findOne({
    where: { walletAddress: address },
    relations: ['user'],
  });
};

const getAddressesByUser = async (user: User): Promise<string[] | undefined> => {
  const addressesData: Address[] = await getRepository(Address).find({
    where: {
      user: { id: user.id },
    },
  });

  return addressesData?.map(addressData => addressData.walletAddress);
};

export const UserService = {
  find,
  findById,
  findByAddress,
  create,
  remove,
  save,
  follow,
  unfollow,
  isFollow,
  getFollowingCount,
  getFollowerCount,
  getFollowings,
  getFollowers,
  getAddressObject,
  getAddressesByUser,
};
