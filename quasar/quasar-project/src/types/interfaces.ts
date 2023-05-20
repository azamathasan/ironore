interface Substances {
    ferrum: number|undefined,
    silicium: number|undefined,
    aluminium: number|undefined,
    calcium: number|undefined,
    sulfur: number|undefined
}

interface Concentrate extends Substances {
    id: number|undefined,
    user_id: number|undefined,
    month: string|null,
}

interface RowReport extends Substances {
    value: string|null // max, min, average
}

interface ConcentrateAdd extends Substances {
    month: string|null,
    ferrum: number|undefined,
    silicium: number|undefined,
    aluminium: number|undefined,
    calcium: number|undefined,
    sulfur: number|undefined
}

export {
    Substances,
    Concentrate,
    RowReport,
    ConcentrateAdd
}