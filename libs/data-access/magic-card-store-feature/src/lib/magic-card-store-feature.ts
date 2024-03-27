import { patchState, signalStoreFeature, withComputed, withHooks, withMethods, withState } from "@ngrx/signals";
import { computed, effect, inject } from "@angular/core";
import { tapResponse } from "@ngrx/operators";
import { HttpErrorResponse } from "@angular/common/http";
import { MagicCardService } from "@nx-train/data-access/magic-card-service";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { debounceTime, distinctUntilChanged, map, pipe, switchMap, tap } from "rxjs";
import { Filter, MagicCard } from "@nx-train/shared/types";

export type State = {
  loading: boolean,
  cards: MagicCard[],
  searchCards: MagicCard[],
  filter: Filter
}

const initialState: State = {
  loading: false,
  cards: [],
  searchCards: [],
  filter: {
    searchTerm: '',
    colors: [],
    types: [],
    subtypes: [],
    sort: {
      field: null,
      direction: null,
    },
  }
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

      searchCards: rxMethod<Filter>(
        pipe(
          debounceTime(300),
          distinctUntilChanged(),
          tap(() => patchState(store, { loading: true })),
          map(filter => paramsFromFilter(filter)),
          switchMap((filterParams) => magicCardService.searchCards(filterParams).pipe(
            map(({ cards }) => cards),
            tapResponse({
              next: (cards) => patchState(store, { cards }),
              error: (error: HttpErrorResponse) => console.error(error),
              finalize: () => patchState(store, { loading: false })
            })
          )),
        )
      ),

    })),

    withHooks({
      onInit(store) {
        effect(() => {
          const filter = store.filter()
          store.searchCards(filter)
        }, { allowSignalWrites: true })
      }
    })
  )
}

export function setFilter(filter: Filter): {filter: Filter} {
  return {filter};
}

function paramsFromFilter(filter: Filter): string {
  const params = new URLSearchParams();

  if (filter.searchTerm) params.set('name', filter.searchTerm);
  if (filter.colors.length) params.set('colors', filter.colors.join(','));
  if (filter.types.length) params.set('types', filter.types.join(','));
  if (filter.subtypes.length) params.set('subtypes', filter.subtypes.join(','));

  return params.toString();
}
