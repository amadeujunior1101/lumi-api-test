import { DataTypes, Model } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import { sequelizeConfig } from "../../../sequelize.config";

class LoadBillModel extends Model {
  id!: string;
  load!: boolean;
}

LoadBillModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: uuidv4,
      primaryKey: true,
    },
    load: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize: sequelizeConfig,
    modelName: "LoadBill",
  }
);

export { LoadBillModel };
