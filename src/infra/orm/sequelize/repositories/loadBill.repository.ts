import { Sequelize } from "sequelize";
import { LoadBillRepositoryAbstract } from "../../../../domain/abstracts";
import { LoadBillEntity } from "../../../../domain/entities";
import { LoadBillModel } from "../models";

class LoadBillRepository implements LoadBillRepositoryAbstract {
  public sequelize: Sequelize;

  constructor(sequelize: Sequelize) {
    this.sequelize = sequelize;
  }

  async create(data: Omit<LoadBillEntity, "id">) {
    return await LoadBillModel.create(data);
  }

  async getStatus() {
    return await LoadBillModel.findOne();
  }
}

export { LoadBillRepository };
