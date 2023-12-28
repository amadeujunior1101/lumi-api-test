import { DataTypes, Model } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import { sequelizeConfig } from "../../../sequelize.config";

class BillModel extends Model {
  id!: string;
  clientCode!: string;
  nameFile!: string;
  pdfFile!: Buffer;
  energyElectricalKwhAmount!: number;
  energyElectricalKwhValue!: number;
  energySCEEWithoutICMSAmount!: number;
  energySCEEWithoutICMSValue!: number;
  energyCompensatedGDIAmount!: number;
  energyCompensatedGDIValue!: number;
  municipalPublicLightingContribution!: number;
  referenceMonth!: string;
}

BillModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: uuidv4,
      primaryKey: true,
    },
    clientCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nameFile: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pdfFile: {
      type: DataTypes.BLOB,
      allowNull: false,
    },
    energyElectricalKwhAmount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    energyElectricalKwhValue: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    energySCEEWithoutICMSAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    energySCEEWithoutICMSValue: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    energyCompensatedGDIAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    energyCompensatedGDIValue: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    municipalPublicLightingContribution: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    referenceMonth: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: sequelizeConfig,
    modelName: "Bill",
  }
);

export { BillModel };
