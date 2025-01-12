import { Router } from 'express';
import {
  addGrocery,
  viewGroceries,
  updateGrocery,
  deleteGrocery,
  manageInventory,
} from '../controllers/adminController';

const router = Router();

router.post('/add', addGrocery);
router.get('/view', viewGroceries);
router.put('/update/:id', updateGrocery);
router.delete('/delete/:id', deleteGrocery);
router.patch('/inventory/:id', manageInventory);

export default router;
