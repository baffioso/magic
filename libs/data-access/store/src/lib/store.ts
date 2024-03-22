import { computed, inject } from "@angular/core";
import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from "@ngrx/signals";
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators'
import { Person, Friend } from "@nx-train/shared/types";
import { pipe, switchMap } from "rxjs";
import { ApiService, Post } from "@nx-train/data-access/api-service";
import { HttpErrorResponse } from "@angular/common/http";
import { withMagicCards } from "@nx-train//data-access/magic-card-store-feature";

export type State = {
  person: Person,
  friends: Friend[],
  isLoading: boolean,
  posts: Post[],
  selectedPostId: number | null,
}

const initialState: State = {
  person: {
    name: 'John Doe',
    age: 30,
  },
  friends: [
    {
      name: 'Jane Doe',
      age: 28,
    },
    {
      name: 'Joe Bloggs',
      age: 35,
    }
  ],
  isLoading: false,
  posts: [],
  selectedPostId: null,
};

export const Store = signalStore(
  withState<State>(initialState),
  withMagicCards(),

  withComputed((state) => ({
    ageString: computed<string>(() => `I'm ${state.person.age()}`),
    selectedPost: computed<Post | null>(() => state.posts().find(post => post.id === state.selectedPostId()) || null)
  })),

  withMethods((store, apiService = inject(ApiService)) => ({

    addFriend: (friend: Friend): void => {
      patchState(store, (state) => ({
        ...state,
        friends: [...state.friends, friend],
      }))
    },

    removeFriend: (): void => {
      patchState(store, ({ friends }) => ({
        friends: friends.slice(0, -1)
      }))
    },

    selectPostId: (id: number): void => {
      patchState(store, { selectedPostId: id })
    },

    fetchPosts: rxMethod<void>(
      pipe(
        switchMap(() => apiService.fetchPosts().pipe(
          tapResponse({
            next: (posts) => patchState(store, { isLoading: false, posts }),
            error: (error: HttpErrorResponse) => console.error(error),
            finalize: () => patchState(store, { isLoading: false }),
          })
        )),
      )
    ),

    fetchPost: rxMethod<number>(
      pipe(
        switchMap((id) => apiService.fetchPost(id)),
      )
    )
  })),

  withHooks({
    onInit(store) {
      store.fetchPosts();
    }
  })
)
