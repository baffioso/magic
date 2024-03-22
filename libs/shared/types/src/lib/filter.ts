import { Color, Type } from "./magic-card"

export type Filter = {
  searchTerm: string,
  colors: Color[],
  types: Type[],
  sort: {
    field: null | 'power' | 'toughness',
    direction: null | 'asc' | 'desc'
  }
}
