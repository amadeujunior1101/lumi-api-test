import { BillRepositoryAbstract } from "../../domain/abstracts";
import { HttpResponse, responseSuccess } from "../../shared/contracts";
import { UseCase } from "../../shared/useCase.interface";

export class GetClientsUseCase implements UseCase {
  constructor(private readonly billRepository: BillRepositoryAbstract) {}
  async execute(): Promise<HttpResponse<any>> {
    try {
      const clients = await this.billRepository.getClients();
      return responseSuccess(clients);
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao listar as fatutas");
    }
  }
}
