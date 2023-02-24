export default class ResponseDto {
  readonly message: string;
  readonly code: number;
  readonly data?: any;

  constructor(code: number, message: string, response?: any) {
    this.message = message;
    this.data = response;
    this.code = code;
  }
}
