import { beforeEach, expect, test, vi } from "vitest";
import { GetBillByClientCodeUseCase } from "../application/useCases/getBillByClientCode.useCase";
import { BillRepositoryAbstract } from "../domain/abstracts";

let getBillByClientCodeUseCase: GetBillByClientCodeUseCase;

const billRepository = {
  create: vi.fn(),
  getClients: vi.fn(),
  getByClientCode: vi.fn(),
  getOne: vi.fn(),
  get: vi.fn(),
} as BillRepositoryAbstract;

beforeEach(() => {
  getBillByClientCodeUseCase = new GetBillByClientCodeUseCase(billRepository);
});

test("should be able to get bill by client code", async () => {
  billRepository.getByClientCode = vi.fn().mockResolvedValueOnce([
    {
      id: "c0f6cc29-2d35-4e0c-af9b-71ab6af77c1c",
      clientCode: "7005400387",
      referenceMonth: "JUN/2023",
    },
    {
      id: "146d67ff-1e00-4387-a309-e9e60f0e6a2c",
      clientCode: "7005400387",
      referenceMonth: "JUL/2023",
    },
    {
      id: "63dda6c6-46fb-4838-bcea-204774d92028",
      clientCode: "7005400387",
      referenceMonth: "AGO/2023",
    },
  ]);

  const result = await getBillByClientCodeUseCase.execute(
    "0dfd9b90-f0f7-4070-8f7a-287bb1fd0069"
  );

  expect(result.data[0]["clientCode"]).toBe("7005400387");
  expect(result.data[0]["referenceMonth"]).toBe("JUN/2023");
  expect(result.data[1]["referenceMonth"]).toBe("JUL/2023");
  expect(result.data[2]["referenceMonth"]).toBe("AGO/2023");
});

test("should handle error correctly", async () => {
  const expectedError = new Error("Erro ao listar as fatutas");
  const getMock = vi.fn().mockRejectedValueOnce(expectedError);
  billRepository.getByClientCode = getMock;

  const originalConsoleError = console.error;

  console.error = () => {};

  try {
    await getBillByClientCodeUseCase.execute(
      "0dfd9b90-f0f7-4070-8f7a-287bb1fd0069"
    );

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
