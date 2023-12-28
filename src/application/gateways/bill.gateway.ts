import { BillParsedResult } from "../init/bill.interface";

export interface BillGateway {
  parsePdf(pdfFile: Buffer): Promise<BillParsedResult | null>;
}
