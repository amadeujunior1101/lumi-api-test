export const HttpStatus = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

export class HttpResponse<T = any> {
  status: number;
  data: T;

  constructor(status: number, data: T) {
    this.status = status;
    this.data = data;
  }
}

export function responseSuccess<T = any>(data: T): HttpResponse<T> {
  return new HttpResponse(HttpStatus.OK, data);
}
