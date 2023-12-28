export class BillEntity {
  id: string;
  clientCode: string;
  nameFile: string;
  pdfFile: Buffer;
  energyElectricalKwhAmount: number;
  energyElectricalKwhValue: number;
  energySCEEWithoutICMSAmount: number;
  energySCEEWithoutICMSValue: number;
  energyCompensatedGDIAmount: number;
  energyCompensatedGDIValue: number;
  municipalPublicLightingContribution: number;
  referenceMonth: string;

  constructor(input: {
    id: string;
    clientCode: string;
    nameFile: string;
    pdfFile: Buffer;
    energyElectricalKwhAmount: number;
    energyElectricalKwhValue: number;
    energySCEEWithoutICMSAmount: number;
    energySCEEWithoutICMSValue: number;
    energyCompensatedGDIAmount: number;
    energyCompensatedGDIValue: number;
    municipalPublicLightingContribution: number;
    referenceMonth: string;
  }) {
    this.id = input.id;
    this.clientCode = input.clientCode;
    this.nameFile = input.nameFile;
    this.pdfFile = input.pdfFile;
    this.clientCode = input.clientCode;
    this.energyElectricalKwhAmount = input.energyElectricalKwhAmount;
    this.energyElectricalKwhValue = input.energyElectricalKwhValue;

    this.energySCEEWithoutICMSAmount = input.energySCEEWithoutICMSAmount;
    this.energySCEEWithoutICMSValue = input.energySCEEWithoutICMSValue;
    this.energyCompensatedGDIAmount = input.energyCompensatedGDIAmount;

    this.energyCompensatedGDIValue = input.energyCompensatedGDIValue;
    this.municipalPublicLightingContribution =
      input.municipalPublicLightingContribution;
    this.referenceMonth = input.referenceMonth;
  }
}
