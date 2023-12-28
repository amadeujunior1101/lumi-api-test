import { BillEntity } from "../../../domain/entities";

export class BillUtilityHelper {
  // Consumo de Energia Elétrica
  static sumEnergyAmounts(bills: BillEntity[]): number {
    return bills.reduce(
      (total, bill) =>
        total +
        (bill.energyElectricalKwhAmount || 0) +
        (bill.energySCEEWithoutICMSAmount || 0),
      0
    );
  }
  // Energia Compensada
  static sumCompensatedGDIAmounts(bills: BillEntity[]): number {
    return bills.reduce(
      (total, bill) => total + (bill.energyCompensatedGDIAmount || 0),
      0
    );
  }
  // Economia GD
  static sumCompensatedGDIValues(bills: BillEntity[]): number {
    return bills.reduce(
      (total, bill) => total + (bill.energyCompensatedGDIValue || 0),
      0
    );
  }

  // Valor Total sem GD
  static sumTotalValues(bills: BillEntity[]): number {
    return bills.reduce(
      (total, bill) =>
        total +
        (bill.energyElectricalKwhValue || 0) +
        (bill.energySCEEWithoutICMSValue || 0) +
        (bill.municipalPublicLightingContribution || 0),
      0
    );
  }
}
