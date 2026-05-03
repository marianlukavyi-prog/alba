export const COMPANY = {
  legalName: 'Alba Ventanas SL',
  nif: 'B75999268',
  address: {
    street: 'Av. 9 de Octubre, 89, Pta. 1, 1ª',
    postalCode: '46520',
    city: 'Sagunt',
    province: 'Valencia',
    country: 'España',
  },
  email: 'albaventanas@gmail.com',
  registration: null as null | {
    registry: string
    volume: string
    folio: string
    sheet: string
  },
} as const

export const COMPANY_ADDRESS_LINE = `${COMPANY.address.street}, ${COMPANY.address.postalCode} ${COMPANY.address.city} (${COMPANY.address.province}), ${COMPANY.address.country}`
