import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { Routes } from '../interfaces/routes/routes.interface';
import { AuthValidator } from '../middlewares/validators/auth.validator';

const path: string = '/';
const router: Router = Router();

router.route(`${path}login`).post(AuthValidator.logIn, AuthController.logIn);

export const AuthRoute: Routes = { path, router };
