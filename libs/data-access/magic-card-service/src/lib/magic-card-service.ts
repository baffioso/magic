import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Filter, MagicCards } from "@nx-train/shared/types";
import { Cards } from "scryfall-sdk";

@Injectable({
  providedIn: 'root'
})
export class MagicCardService {
  private http = inject(HttpClient);

  fetchCards() {
    return this.http.get<MagicCards>('https://api.magicthegathering.io/v1/cards');
  }

  searchCards(query: string) {
    return this.http.get<MagicCards>(`https://api.magicthegathering.io/v1/cards?${query}`);
  }

  // searchCards2(query: string) {
  //   return Cards.search(query);
  // }

  // private paramsFromFilter(filter: Filter): string {
  //   const params = new URLSearchParams();

  //   if (filter.searchTerm) params.set('name', filter.searchTerm);
  //   if (filter.colors.length) params.set('colors', filter.colors.join(','));
  //   if (filter.types.length) params.set('types', filter.types.join(','));

  //   return params.toString();
  // }

}
