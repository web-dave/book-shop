import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withProps,
  withState,
  type,
  PartialStateUpdater,
  withHooks,
} from "@ngrx/signals";
import { event, on, withReducer } from "@ngrx/signals/events";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { tapResponse } from "@ngrx/operators";
import { Book } from "../models/book";
import { computed, effect, inject } from "@angular/core";
import { BookApiService } from "../services/book-api.service";
import { filter, iif, of, pipe, switchMap } from "rxjs";
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from "@angular/router";
import { withDevtools } from "@angular-architects/ngrx-toolkit";

type bookState = {
  books: Book[];
  selected: string;
};

const initialState: bookState = {
  books: [],
  selected: "",
};

export const bookStore = signalStore(
  withProps(() => ({
    service: inject(BookApiService),
  })),
  withState(initialState),
  withDevtools("bookStore"),
  withComputed((state) => ({
    byIsbn: computed(() =>
      state.books().find((book: Book) => book.isbn == state.selected()),
    ),
    state: computed(() => {
      console.log("[bookStore]", state.books(), state.selected());
      return state;
    }),
  })),
  withMethods(({ service, ...state }) => ({
    loadAll: rxMethod<string>(
      pipe(
        switchMap(() =>
          service.all().pipe(
            tapResponse({
              next: (books) => patchState(state, { books }),
              error: (err) => console.error(err),
            }),
          ),
        ),
      ),
    ),
    loadOne: rxMethod<string>(
      pipe(
        switchMap((isbn: string) => {
          if (!!state.books().find((book) => book.isbn == isbn)) {
            return of(
              state.books().find((book) => book.isbn == isbn) as Book,
            ).pipe(
              tapResponse({
                next: () =>
                  patchState(state, {
                    selected: isbn,
                  }),
                error: (err) => console.error(err),
              }),
            );
          } else {
            return service.one(isbn).pipe(
              tapResponse({
                next: (book) =>
                  patchState(state, {
                    books: [...state.books(), book],
                    selected: isbn,
                  }),
                error: (err) => console.error(err),
              }),
            );
          }
        }),
      ),
    ),
    create: rxMethod<Book>(
      pipe(
        switchMap((book) =>
          service.create(book).pipe(
            tapResponse({
              next: (book) =>
                patchState(state, { books: [...state.books(), book] }),
              error: (err) => console.error(err),
            }),
          ),
        ),
      ),
    ),
  })),
);

export const isbnResolver: ResolveFn<any> = (route: ActivatedRouteSnapshot) => {
  const store = inject(bookStore);
  return store.loadOne(route.params["isbn"]);
};

const incrementBy = event("[Counter Page] Increment By", type<number>());
const increment = event("[Counter Page] Increment");
const incrementBoth = event("[Counter Page] Increment Both");

export const CounterStore = signalStore(
  withState({ count1: 0, count2: 0 }),
  withReducer(
    // 👇 Returning a partial state object.
    on(incrementBy, (event, state) => ({
      count1: state.count1 + event.payload,
    })),
    // 👇 Returning a partial state updater.
    on(increment, () => incrementFirst()),
    // 👇 Returning an array of partial state updaters.
    on(incrementBoth, () => [incrementFirst(), incrementSecond()]),
  ),
);

function incrementFirst(): PartialStateUpdater<{ count1: number }> {
  return (state) => ({ count1: state.count1 + 1 });
}

function incrementSecond(): PartialStateUpdater<{ count2: number }> {
  return (state) => ({ count2: state.count2 + 1 });
}
