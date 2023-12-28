import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { LoadBillRepositoryAbstract } from "../../domain/abstracts";
import { BillRepositoryAbstract } from "../../domain/abstracts/bill.abstract";
import { BillEntity, LoadBillEntity } from "../../domain/entities";
import { HttpResponse, responseSuccess } from "../../shared/contracts";
import { BillGateway } from "../gateways/bill.gateway";

export class LoadBillInit {
  constructor(
    private readonly loadBillRepository: LoadBillRepositoryAbstract,
    private readonly billRepository: BillRepositoryAbstract,
    private readonly billGateway: BillGateway
  ) {}

  async execute(): Promise<HttpResponse<any>> {
    try {
      const dataFolder = path.join(__dirname, "../../infra/data");

      const listBills = fs
        .readdirSync(dataFolder)
        .filter((file) => file.endsWith(".pdf"));

      const getStatus = await this.loadBillRepository.getStatus();

      if (!getStatus) {
        await Promise.all(
          listBills.map(async (nameBill) => {
            const pdfFile = fs.readFileSync(path.join(dataFolder, nameBill));
            const list = await this.billGateway.parsePdf(pdfFile);

            if (list) {
              const newUser = new BillEntity({
                ...list,
                nameFile: nameBill,
                pdfFile,
                id: uuidv4(),
              });
              await this.billRepository.create(newUser);
            }
          })
        );
        const loadBill = new LoadBillEntity({ id: uuidv4(), load: true });
        await this.loadBillRepository.create(loadBill);
      }

      return responseSuccess({ success: true });
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao adicionar uma fatura");
    }
  }
}
