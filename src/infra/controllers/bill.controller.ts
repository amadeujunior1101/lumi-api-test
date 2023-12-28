import { Request, Response } from "express";
import { GetSumBillUseCase } from "../../application/useCases";
import { GetBillByClientCodeUseCase } from "../../application/useCases/getBillByClientCode.useCase";
import { GetClientsUseCase } from "../../application/useCases/getClients.useCase";
import { GetOneBillUseCase } from "../../application/useCases/getOneBill.useCase";

export class BillController {
  constructor(
    private readonly getSumBillUseCase: GetSumBillUseCase,
    private readonly getClientsUseCase: GetClientsUseCase,
    private readonly getBillByClientCodeUseCase: GetBillByClientCodeUseCase,
    private readonly getOneBillUseCase: GetOneBillUseCase
  ) {}

  async listBills(req: Request, res: Response) {
    const { client_code } = req.query;
    const clientCode =
      typeof client_code === "string" ? client_code : undefined;

    const bills = await this.getSumBillUseCase.execute({ clientCode });
    return res.status(bills.status).json(bills);
  }

  async listClients(req_: Request, res: Response) {
    const clients = await this.getClientsUseCase.execute();
    return res.status(clients.status).json(clients);
  }

  async listByClientCode(req: Request, res: Response) {
    const { client_code: clientCode } = req.params;
    const clients = await this.getBillByClientCodeUseCase.execute(clientCode);
    return res.status(clients.status).json(clients);
  }

  async listOne(req: Request, res: Response) {
    const { id } = req.params;
    const clients = await this.getOneBillUseCase.execute({
      id,
    });
    return res.status(clients.status).json(clients);
  }
}
