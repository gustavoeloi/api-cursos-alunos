class AppError {
  message: string;
  statusCode: number;

  constructor(message: string, statusCode: number = 404) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

export { AppError };
