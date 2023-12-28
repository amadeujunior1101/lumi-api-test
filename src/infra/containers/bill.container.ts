import { LoadBillInit } from "../../application/init";
import { ParserService } from "../../application/init/bill.service";
import { GetSumBillUseCase } from "../../application/useCases";
import { GetBillByClientCodeUseCase } from "../../application/useCases/getBillByClientCode.useCase";
import { GetClientsUseCase } from "../../application/useCases/getClients.useCase";
import { GetOneBillUseCase } from "../../application/useCases/getOneBill.useCase";
import { BillController } from "../controllers/bill.controller";
import {
  BillRepository,
  LoadBillRepository,
} from "../orm/sequelize/repositories";
import { sequelizeConfig } from "../sequelize.config";

const loadBillRepository = new LoadBillRepository(sequelizeConfig);
const billRepository = new BillRepository(sequelizeConfig);
const billGateway = new ParserService();

const loadBillInit = new LoadBillInit(
  loadBillRepository,
  billRepository,
  billGateway
);
const getSumBillUseCase = new GetSumBillUseCase(billRepository);
const getClientsUseCase = new GetClientsUseCase(billRepository);
const getBillByClientCodeUseCase = new GetBillByClientCodeUseCase(
  billRepository
);
const getOneBillUseCase = new GetOneBillUseCase(billRepository);

const billController = new BillController(
  getSumBillUseCase,
  getClientsUseCase,
  getBillByClientCodeUseCase,
  getOneBillUseCase
);

export { billController };

export { loadBillInit };
