import { Router } from 'express';
import { getAvailableGroceries, placeOrder } from '../controllers/userController';

const router = Router();

router.get('/available', getAvailableGroceries);
router.post('/order', placeOrder);

export default router;
