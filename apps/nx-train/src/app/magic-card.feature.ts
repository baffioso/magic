import { patchState, signalStoreFeature, withComputed, withMethods, withState } from "@ngrx/signals";
import { computed, inject } from "@angular/core";
import { tapResponse } from "@ngrx/operators";
import { HttpErrorResponse } from "@angular/common/http";
import { MagicCardService } from "./magic-card.service";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { debounceTime, distinctUntilChanged, map, pipe, switchMap } from "rxjs";
import { Filter, MagicCard } from "@nx-train/shared/types";

export type State = {
  cards: MagicCard[]
  searchCards: MagicCard[]
}

const initialState: State = {
  cards: [],
  searchCards: []
}

export function withMagicCards() {
  return signalStoreFeature(
    withState(initialState),

    withComputed((state) => ({
      cardsWithImage: computed(() => state.cards().filter(card => card.imageUrl))
    })),

    withMethods((store, magicCardService = inject(MagicCardService)) => ({
      fetchCards: rxMethod<void>(
        pipe(
          switchMap(() => magicCardService.fetchCards().pipe(
            map(({ cards }) => cards),
            tapResponse({
              next: (cards) => patchState(store, { cards }),
              error: (error: HttpErrorResponse) => console.error(error),
            })
          )),
        )
      ),
      searchCards: rxMethod<string>(
        pipe(
          debounceTime(300),
          distinctUntilChanged(),
          switchMap((term) => magicCardService.searchCards(term).pipe(
            map(({ cards }) => cards),
            tapResponse({
              next: (searchCards) => patchState(store, { searchCards }),
              error: (error: HttpErrorResponse) => console.error(error),
            })
          )),
        )
      ),
    }))
  )
}

export function setSearchTerm(searchTerm: string): Partial<Filter> {
  return { searchTerm };
}
