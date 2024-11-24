const Registries = [
    "AX", "BX", "CX", "DX"
]

export const RegistersData = {
  AX: 0,
  BX: 0,
  CX: 0,
  DX: 0,
}

export type ReturnType = {
  message: string
  isError: boolean
  registriesData?: typeof RegistersData 
}

export type RegistriesType = typeof Registries[number]