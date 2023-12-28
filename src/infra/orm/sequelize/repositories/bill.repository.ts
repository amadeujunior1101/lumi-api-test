import { Sequelize } from "sequelize";
import { BillRepositoryAbstract } from "../../../../domain/abstracts/bill.abstract";
import { BillEntity } from "../../../../domain/entities";
import { BillModel } from "../models";

class BillRepository implements BillRepositoryAbstract {
  public sequelize: Sequelize;

  constructor(sequelize: Sequelize) {
    this.sequelize = sequelize;
  }

  async create(data: Omit<BillEntity, "id">) {
    return await BillModel.create(data);
  }

  async get(filters?: Record<string, any>) {
    if (filters?.clientCode) {
      return await BillModel.findAll({
        where: { clientCode: filters.clientCode },
      });
    }
    return await BillModel.findAll();
  }

  async getClients() {
    return await BillModel.findAll({
      attributes: ["clientCode"],
      raw: true,
      group: ["clientCode"],
    });
  }

  async getByClientCode(clientCode: string) {
    return await BillModel.findAll({
      where: { clientCode },
      attributes: ["id", "clientCode", "referenceMonth"],
    });
  }

  async getOne(id: string) {
    return await BillModel.findAll({
      where: { id },
      attributes: ["id", "nameFile", "clientCode", "referenceMonth", "pdfFile"],
    });
  }
}

export { BillRepository };
