export interface MagicCards {
  cards: MagicCard[];
}

export interface MagicCard {
  name: string;
  manaCost: string;
  cmc: number;
  colors: string[];
  colorIdentity: string[];
  type: string;
  types: Type[];
  subtypes?: string[];
  rarity: string;
  set: string;
  setName: string;
  text: string;
  artist: string;
  number: string;
  power?: string;
  toughness?: string;
  layout: string;
  multiverseid?: string;
  imageUrl?: string;
  variations?: string[];
  foreignNames?: ForeignName[];
  printings: string[];
  originalText?: string;
  originalType?: string;
  legalities: Legality[];
  id: string;
  flavor?: string;
  rulings?: Ruling[];
  supertypes?: string[];
}

export type Type =
  'Creature' |
  'Enchantment' |
  'Artifact' |
  'Instant' |
  'Sorcery' |
  'Planeswalker' |
  'Land';

export enum Subtype {
  Dragon = 'Dragon',
  Demon = 'Demon',
  Goblin = 'Goblin',
  Tyranid = 'Tyranid',
  Alien = 'Alien',
  Vampire = 'Vampire',
  Orc = 'Orc',
}

export enum Color {
  White = 'W',
  Red = 'R',
  Blue = 'U',
  Black = 'B',
  Green = 'G',
}

interface Ruling {
  date: string;
  text: string;
}

interface Legality {
  format: string;
  legality: string;
}

interface ForeignName {
  name: string;
  text: string;
  type: string;
  flavor?: string;
  imageUrl: string;
  language: string;
  multiverseid: number;
}


