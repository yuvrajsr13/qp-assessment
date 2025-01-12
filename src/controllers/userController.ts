import { Request, Response } from 'express';
import Grocery from '../models/grocery';

// View available groceries
export const getAvailableGroceries = async (_req: Request, res: Response): Promise<void> => {
  try {
    // Only return items with inventory greater than 0
    const groceries = await Grocery.findAll({ where: { inventory: { gt: 0 } } });
    res.status(200).json(groceries);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch available groceries' });
  }
};

// Place an order for multiple groceries
export const placeOrder = async (req: Request, res: Response): Promise<void> => {
  const { items } = req.body; // Example: [{ id: 1, quantity: 2 }, { id: 2, quantity: 3 }]
  try {
    const results = await Promise.all(
      items.map(async ({ id, quantity }: { id: number; quantity: number }) => {
        const grocery = await Grocery.findByPk(id);

        if (!grocery) {
          return { id, status: 'failed', message: 'Grocery not found' };
        }

        if (grocery.inventory < quantity) {
          return { id, status: 'failed', message: 'Insufficient inventory' };
        }

        grocery.inventory -= quantity; // Deduct from inventory
        await grocery.save();

        return { id, status: 'success', message: `Ordered ${quantity} of ${grocery.name}` };
      })
    );

    res.status(200).json(results); // Return a summary of order results
  } catch (error) {
    res.status(500).json({ error: 'Failed to place order' });
  }
};
