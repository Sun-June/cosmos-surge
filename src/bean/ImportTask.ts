interface ImportTask {

    id: string

    name: string

    fromId: string

    toId: string

    type: "upsert" | "skip"

    status: "init" | "run" | "end"

    process: number

    error: number

    skip?: number

    total: number

    sql: string

    start: Date

    end?: Date

    message?: string

}

export default ImportTask