class Log {
    public static model: Number = 1

    public static log (... message: any) {
        if (this.model === 1) {
            console.log(...message)
        }
    }

    public static info (... message: any) {
        if (this.model === 1) {
            console.info(...message)
        }
    }

    public static error (message: string, ...error: any) {
        console.error(message, ...error)
    }
}

export default Log