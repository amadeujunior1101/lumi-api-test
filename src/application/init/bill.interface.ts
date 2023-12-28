export interface BillParsedResult {
  clientCode: string;
  energyElectricalKwhAmount: number;
  energyElectricalKwhValue: number;
  energySCEEWithoutICMSAmount: number;
  energySCEEWithoutICMSValue: number;
  energyCompensatedGDIAmount: number;
  energyCompensatedGDIValue: number;
  municipalPublicLightingContribution: number;
  referenceMonth: string;
}
