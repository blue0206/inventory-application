export class ApiResponse<DataType> {
    statusCode: number;
    data: DataType;
    message: string;
    success: boolean;
    constructor(statusCode: number, data: DataType, message: string, success: boolean) {
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = success;
    }
}

// export { ApiResponse };