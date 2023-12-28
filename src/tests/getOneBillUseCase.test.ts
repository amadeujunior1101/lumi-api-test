import { beforeEach, expect, test, vi } from "vitest";
import { GetOneBillUseCase } from "../application/useCases/getOneBill.useCase";
import { BillRepositoryAbstract } from "../domain/abstracts";
import { billMock } from "./bill.mock";

let getOneBillUseCase: GetOneBillUseCase;

const billRepository = {
  create: vi.fn(),
  getClients: vi.fn(),
  getByClientCode: vi.fn(),
  getOne: vi.fn(),
  get: vi.fn(),
} as BillRepositoryAbstract;

beforeEach(() => {
  getOneBillUseCase = new GetOneBillUseCase(billRepository);
});

test("should be able to get one bill", async () => {
  const buffer = Buffer.from("test");

  billRepository.getOne = vi.fn().mockResolvedValueOnce([billMock]);

  const result = await getOneBillUseCase.execute({
    id: "0dfd9b90-f0f7-4070-8f7a-287bb1fd0069",
  });

  expect(result.data[0]["nameFile"]).toBe("3001165684-11-2023.pdf");
  expect(result.data[0]["clientCode"]).toBe("7202788969");
  expect(result.data[0]["referenceMonth"]).toBe("NOV/2023");
  expect(result.data[0]["pdfFile"]).toEqual(buffer);
});

test("should handle error correctly", async () => {
  const expectedError = new Error("Erro ao listar as fatutas");
  const getMock = vi.fn().mockRejectedValueOnce(expectedError);
  billRepository.get = getMock;

  const originalConsoleError = console.error;

  console.error = () => {};

  try {
    await getOneBillUseCase.execute({
      id: "0dfd9b90-f0f7-4070-8f7a-287bb1fd0069",
    });

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
