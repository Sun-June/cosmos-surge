class ErrorInfo extends Error {

    constructor(name: string, message: string, stack?: string) {
        super();
        this.name = name;
        this.message = message;
        this.stack = stack;
    }


    toString(): string {
        if (!this.stack) {
            return `errorName: ${this.name}, message: ${this.message}`
        }
        return super.toString();
    }
}

export default ErrorInfo