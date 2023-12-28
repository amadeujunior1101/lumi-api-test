import pdfParse from "pdf-parse";
import { BillGateway } from "../gateways/bill.gateway";
import { BillParsedResult } from "./bill.interface";

export class ParserService implements BillGateway {
  async parsePdf(pdfFile: Buffer): Promise<BillParsedResult | null> {
    const data = await pdfParse(pdfFile);

    const lines = data.text.split("\n");

    const energyElectricalIndex = lines.findIndex((line) =>
      line.includes("Energia Elétrica")
    );
    const energySCEEWithoutICMSIndex = lines.findIndex((line) =>
      line.includes("Energia SCEE s/ ICMS")
    );
    const compensatedGDIIndex = lines.findIndex((line) =>
      line.includes("Energia compensada GD I")
    );
    const municipalPublicLightingContributionIndex = lines.findIndex((line) =>
      line.includes("Contrib Ilum Publica Municipal")
    );
    const numberClientIndex = lines.findIndex((line) =>
      line.includes("Nº DO CLIENTE")
    );
    const referenceMonthConsumerIndex = lines.findIndex((line) =>
      line.includes("Referente a")
    );

    if (numberClientIndex !== -1) {
      const result: BillParsedResult = {
        clientCode: this.getLineValue(lines, numberClientIndex + 1).split(
          /\s+/
        )[0],

        energyElectricalKwhAmount:
          parseFloat(
            this.getLineValue(lines, energyElectricalIndex)
              .split(/\s+/)[2]
              .replace(",", ".")
          ) || 0,

        energyElectricalKwhValue:
          parseFloat(
            this.getLineValue(lines, energyElectricalIndex)
              .split(/\s+/)[4]
              .replace(",", ".")
          ) || 0,

        energySCEEWithoutICMSAmount:
          parseFloat(
            this.getLineValue(lines, energySCEEWithoutICMSIndex)
              .split(/\s+/)[4]
              .replace(",", ".")
          ) || 0,

        energySCEEWithoutICMSValue:
          parseFloat(
            this.getLineValue(lines, energySCEEWithoutICMSIndex)
              .split(/\s+/)[6]
              .replace(",", ".")
          ) || 0,

        energyCompensatedGDIAmount:
          parseFloat(
            this.getLineValue(lines, compensatedGDIIndex)
              .split(/\s+/)[4]
              .replace(",", ".")
          ) || 0,

        energyCompensatedGDIValue:
          parseFloat(
            this.getLineValue(lines, compensatedGDIIndex)
              .split(/\s+/)[6]
              .replace(",", ".")
          ) || 0,

        municipalPublicLightingContribution:
          parseFloat(
            this.getLineValue(lines, municipalPublicLightingContributionIndex)
              .split(/\s+/)[4]
              .replace(",", ".")
          ) || 0,

        referenceMonth: this.getLineValue(
          lines,
          referenceMonthConsumerIndex + 1
        )
          .trim()
          .split(/\s+/)[0],
      };

      return result;
    } else {
      console.log('Linha "Nº DO CLIENTE" não encontrada.');
      return null;
    }
  }

  getLineValue(lines: string[], index: number): string {
    return index >= 0 && index < lines.length ? lines[index].trim() : "";
  }
}
