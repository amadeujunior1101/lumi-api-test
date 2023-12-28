import { BillModel } from "../../infra/orm/sequelize/models/bill.model";
import { BillEntity } from "../entities/bill.entity";

export abstract class BillRepositoryAbstract {
  abstract create(data: Omit<BillEntity, "id">): Promise<BillModel>;
  abstract get(filters?: Record<string, any>): Promise<BillModel[]>;
  abstract getClients(): Promise<BillModel[]>;
  abstract getByClientCode(clientCode: string): Promise<BillModel[]>;
  abstract getOne(id: string): Promise<BillModel[]>;
}
