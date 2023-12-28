import { BillRepositoryAbstract } from "../../domain/abstracts";
import { HttpResponse, responseSuccess } from "../../shared/contracts";
import { UseCase } from "../../shared/useCase.interface";
import { BillUtilityHelper } from "./helper/billUtility.helper";

export class GetSumBillUseCase implements UseCase {
  constructor(private readonly billRepository: BillRepositoryAbstract) {}
  async execute(params?: { clientCode?: string }): Promise<HttpResponse<any>> {
    try {
      const bills = await this.billRepository.get(params);

      const sumEnergyAmounts = BillUtilityHelper.sumEnergyAmounts(bills);

      const sumCompensatedGDIAmounts =
        BillUtilityHelper.sumCompensatedGDIAmounts(bills);

      const sumCompensatedGDIValues =
        BillUtilityHelper.sumCompensatedGDIValues(bills);

      const sumTotalValues = BillUtilityHelper.sumTotalValues(bills);

      const response = {
        electricPowerConsumptionInKwh: sumEnergyAmounts,
        compensatedEnergyInKwh: sumCompensatedGDIAmounts,
        totalValueWithoutGdInR$: parseFloat(
          (sumTotalValues - Math.abs(sumCompensatedGDIValues)).toFixed(2)
        ),
        gDEconomyInR$: parseFloat(Math.abs(sumCompensatedGDIValues).toFixed(2)),
      };

      return responseSuccess(response);
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao listar as fatutas");
    }
  }
}
