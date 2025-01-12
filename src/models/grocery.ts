import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Grocery extends Model {
  public id!: number;
  public name!: string;
  public price!: number;
  public inventory!: number;
}

Grocery.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    inventory: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: 'Grocery',
    tableName: 'groceries',
  }
);

export default Grocery;
