import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withProps,
  withState,
} from "@ngrx/signals";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { tapResponse } from "@ngrx/operators";
import { Book } from "../models/book";
import { computed, inject } from "@angular/core";
import { BookApiService } from "../services/book-api.service";
import { filter, iif, of, pipe, switchMap } from "rxjs";
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from "@angular/router";

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
  withComputed(({ books, selected }) => ({
    byIsbn: computed(() =>
      books().find((book: Book) => book.isbn == selected()),
    ),
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
  })),
);

export const isbnResolver: ResolveFn<any> = (route: ActivatedRouteSnapshot) => {
  const store = inject(bookStore);
  return store.loadOne(route.params["isbn"]);
};
