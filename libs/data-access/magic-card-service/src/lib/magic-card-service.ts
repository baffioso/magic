import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { MagicCards } from "@nx-train/shared/types";

@Injectable({
  providedIn: 'root'
})
export class MagicCardService {
  private http = inject(HttpClient);

  fetchCards() {
    return this.http.get<MagicCards>('https://api.magicthegathering.io/v1/cards');
  }

  searchCards(query: string) {
    return this.http.get<MagicCards>(`https://api.magicthegathering.io/v1/cards?name=${query}`);
  }

}
