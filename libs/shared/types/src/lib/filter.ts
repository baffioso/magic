import { Color, Subtype, Type } from "./magic-card"

export type Filter = {
  searchTerm: string,
  colors: Color[],
  types: Type[],
  subtypes: Subtype[]
  sort: {
    field: null | 'power' | 'toughness',
    direction: null | 'asc' | 'desc'
  }
}
