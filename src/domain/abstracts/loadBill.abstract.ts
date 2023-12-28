import { LoadBillModel } from "../../infra/orm/sequelize/models";
import { LoadBillEntity } from "../entities";

export abstract class LoadBillRepositoryAbstract {
  abstract create(data: Omit<LoadBillEntity, "id">): Promise<LoadBillModel>;
  abstract getStatus(): Promise<LoadBillEntity | null>;
}
