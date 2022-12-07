import { Request, Response } from 'express';
import HttpStatus from 'http-status';
import Web3 from 'web3';
import { CreateUserDto } from '../dtos/users/users.dto';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

const web3 = new Web3(Web3.givenProvider || 'ws://localhost:8546');

const logIn = async (req: Request, res: Response) => {
  try {
    const userData: CreateUserDto = req.body;

    const account = web3.utils.toChecksumAddress(userData.address);
    const signedMessage = `crypto528 one-time key : ${userData.token}`;
    const recoverAddress = web3.eth.accounts.recover(signedMessage, userData.signature);

    if (account !== recoverAddress) {
      res.status(HttpStatus.NOT_FOUND).json({ message: 'Login unsuccessful' });
      return;
    }

    let user = await UserService.findByAddress(account);
    if (!user) {
      user = await UserService.create(account);
    }
    const token = AuthService.createToken(user);
    return res.status(HttpStatus.OK).send({ token, user });
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
  }
};

export const AuthController = { logIn };
