import { BillRepositoryAbstract } from "../../domain/abstracts";
import { HttpResponse, responseSuccess } from "../../shared/contracts";
import { UseCase } from "../../shared/useCase.interface";

export class GetOneBillUseCase implements UseCase {
  constructor(private readonly billRepository: BillRepositoryAbstract) {}
  async execute(params: { id: string }): Promise<HttpResponse<any>> {
    try {
      const clients = await this.billRepository.getOne(params.id);
      return responseSuccess(clients);
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao listar as fatutas");
    }
  }
}
