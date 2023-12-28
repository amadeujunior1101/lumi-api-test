import { beforeEach, expect, test, vi } from "vitest";
import { GetSumBillUseCase } from "../application/useCases";
import { BillRepositoryAbstract } from "../domain/abstracts";
import { billMock } from "./bill.mock";

let getSumBillUseCase: GetSumBillUseCase;

const billRepository = {
  create: vi.fn(),
  getClients: vi.fn(),
  getByClientCode: vi.fn(),
  getOne: vi.fn(),
  get: vi.fn(),
} as BillRepositoryAbstract;

beforeEach(() => {
  getSumBillUseCase = new GetSumBillUseCase(billRepository);
});

test("should be able to get graphics value all", async () => {
  billRepository.get = vi.fn().mockResolvedValueOnce([billMock]);

  const result = await getSumBillUseCase.execute();

  expect(result.status).toBe(200);
  expect(result.data["electricPowerConsumptionInKwh"]).toBe(51.087);
  expect(result.data["compensatedEnergyInKwh"]).toBe(1.087);
  expect(result.data["totalValueWithoutGdInR$"]).toBe(111.56);
  expect(result.data["gDEconomyInR$"]).toBe(529.72);
});

test("should handle error correctly", async () => {
  const expectedError = new Error("Erro ao listar as fatutas");
  const getMock = vi.fn().mockRejectedValueOnce(expectedError);
  billRepository.get = getMock;

  const originalConsoleError = console.error;

  console.error = () => {};

  try {
    await getSumBillUseCase.execute();
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
