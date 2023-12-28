import { HttpResponse } from "./contracts";

export interface UseCase {
  execute(params?: any): Promise<HttpResponse<any>>;
}
