import { Router } from 'express'; 
import { Routes } from '../interfaces/routes/routes.interface'; 
import { KYCController } from '../controllers/kyc.controller';
const path: string = '/kyc';
const router: Router = Router();
router.route(`${path}/access`).get(KYCController.get); 

export const KYCRoute: Routes = { path, router };
