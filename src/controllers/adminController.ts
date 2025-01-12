import { Request, Response } from 'express';
import Grocery from '../models/grocery';

// Admin response interface
interface AdminResponse {
  id: number;
  name: string;
  price: number;
  inventory: number;
}

// Add a new grocery
export const addGrocery = async (req: Request, res: Response): Promise<void> => {
  const { name, price, inventory } = req.body;
  try {
    const grocery = await Grocery.create({ name, price, inventory });
    const response: AdminResponse = {
      id: grocery.id,
      name: grocery.name,
      price: grocery.price,
      inventory: grocery.inventory,
    };
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add grocery' });
  }
};

// View all groceries
export const viewGroceries = async (_req: Request, res: Response): Promise<void> => {
  try {
    const groceries = await Grocery.findAll();
    const response: AdminResponse[] = groceries.map((grocery) => ({
      id: grocery.id,
      name: grocery.name,
      price: grocery.price,
      inventory: grocery.inventory,
    }));
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch groceries' });
  }
};

// Update grocery details
export const updateGrocery = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { name, price, inventory } = req.body;
  try {
    const grocery = await Grocery.findByPk(id);
    if (!grocery) {
      res.status(404).json({ error: 'Grocery not found' });
      return;
    }

    await grocery.update({ name, price, inventory });

    const response: AdminResponse = {
      id: grocery.id,
      name: grocery.name,
      price: grocery.price,
      inventory: grocery.inventory,
    };
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update grocery' });
  }
};

// Remove a grocery
export const deleteGrocery = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const grocery = await Grocery.findByPk(id);
    if (!grocery) {
      res.status(404).json({ error: 'Grocery not found' });
      return;
    }

    await grocery.destroy();
    
    res.status(200).json({ message: `Grocery with ID ${id} has been deleted successfully.` });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete grocery' });
  }
};


// Manage inventory levels
export const manageInventory = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { inventory } = req.body;
  try {
    const grocery = await Grocery.findByPk(id);
    if (!grocery) {
      res.status(404).json({ error: 'Grocery not found' });
      return;
    }

    grocery.inventory = inventory;
    await grocery.save();

    const response: AdminResponse = {
      id: grocery.id,
      name: grocery.name,
      price: grocery.price,
      inventory: grocery.inventory,
    };
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update inventory' });
  }
};
