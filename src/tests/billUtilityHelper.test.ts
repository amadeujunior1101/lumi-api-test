import { expect, test } from "vitest";
import { BillUtilityHelper } from "../application/useCases/helper/billUtility.helper";
import { billMock } from "./bill.mock";

test("BillUtilityHelper - sumEnergyAmounts should calculate values all", () => {
  const bills = [billMock];

  const sumEnergyAmounts = BillUtilityHelper.sumEnergyAmounts(bills);
  const sumCompensatedGDIAmounts =
    BillUtilityHelper.sumCompensatedGDIAmounts(bills);
  const sumCompensatedGDIValues =
    BillUtilityHelper.sumCompensatedGDIValues(bills);
  const sumTotalValues = BillUtilityHelper.sumTotalValues(bills);

  expect(sumEnergyAmounts).toBe(51.087);
  expect(sumCompensatedGDIAmounts).toBe(1.087);
  expect(sumCompensatedGDIValues).toBe(-529.72);
  expect(sumTotalValues).toBe(641.28);
});
