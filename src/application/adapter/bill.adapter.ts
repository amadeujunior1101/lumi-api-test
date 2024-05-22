import { BillParsedResult } from '../init/bill.interface'

export interface BillAdapter {
  parsePdf(pdfFile: Buffer): Promise<BillParsedResult | null>
}
