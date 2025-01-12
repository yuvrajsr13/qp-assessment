import { Request, Response } from 'express';
import Grocery from '../models/grocery';
import { Op } from 'sequelize';

// Interface for OrderResponse
interface OrderResponse {
  id: number;
  status: 'success' | 'failed';
  message: string;
}

// View available groceries
export const getAvailableGroceries = async (_req: Request, res: Response): Promise<void> => {
  try {
    const groceries = await Grocery.findAll({
      where: {
        inventory: { [Op.gt]: 0 },
      },
    });

    const response = groceries.map((grocery) => ({
      id: grocery.id,
      name: grocery.name,
      price: grocery.price,
      inventory: grocery.inventory,
    }));

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch available groceries' });
  }
};

// Place an order for multiple groceries
export const placeOrder = async (req: Request, res: Response): Promise<void> => {
  const { items } = req.body; // Example: [{ id: 1, quantity: 2 }, { id: 2, quantity: 3 }]
  try {
    // Map each item in the order to an OrderResponse object
    const results: OrderResponse[] = await Promise.all(
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

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: 'Failed to place order' });
  }
};
