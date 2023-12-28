import { beforeEach, expect, test, vi } from "vitest";
import { GetClientsUseCase } from "../application/useCases/getClients.useCase";
import { BillRepositoryAbstract } from "../domain/abstracts";

let getClientsUseCase: GetClientsUseCase;

const billRepository = {
  create: vi.fn(),
  getClients: vi.fn(),
  getByClientCode: vi.fn(),
  getOne: vi.fn(),
  get: vi.fn(),
} as BillRepositoryAbstract;

beforeEach(() => {
  getClientsUseCase = new GetClientsUseCase(billRepository);
});

test("should be able to get all clients", async () => {
  billRepository.getClients = vi.fn().mockResolvedValueOnce([
    {
      clientCode: "7005400387",
    },
    {
      clientCode: "7005400388",
    },
  ]);

  const result = await getClientsUseCase.execute();

  expect(result.data[0]["clientCode"]).toBe("7005400387");
  expect(result.data[1]["clientCode"]).toBe("7005400388");
});

test("should handle error correctly", async () => {
  const expectedError = new Error("Erro ao listar as fatutas");
  const getMock = vi.fn().mockRejectedValueOnce(expectedError);
  billRepository.getClients = getMock;

  const originalConsoleError = console.error;

  console.error = () => {};

  try {
    await getClientsUseCase.execute();

    expect("A execução deveria ter gerado um erro, mas não gerou.");
  } catch (error: any) {
    expect(
      error.message.includes(expectedError.message),
      "O erro gerado não contém a mensagem esperada."
    );
  } finally {
    console.error = originalConsoleError;
  }
});
