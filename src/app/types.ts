const Registries = [
    "AX", "BX", "CX", "DX"
]

export type RegistriesType = typeof Registries[number]

export const RegisterInstructions = {
    "ADD": (destination: RegistriesType, source: RegistriesType) => `ADD ${destination}, ${source}`,
    "SUB": (destination: RegistriesType, source: RegistriesType) => `SUB ${destination}, ${source}`,
    "MUL": (destination: RegistriesType, source: RegistriesType) => `MUL ${destination}, ${source}`,
}