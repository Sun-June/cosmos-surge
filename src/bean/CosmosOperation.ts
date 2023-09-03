interface CosmosOperation {

    linkId: string

    type: string

    query?:string

    items?:Object[]
}

export default CosmosOperation