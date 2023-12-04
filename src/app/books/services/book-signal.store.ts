import { signalStore, withState, withMethods, patchState } from "@ngrx/signals";
import { Book } from "../models/book";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { inject } from "@angular/core";
import { pipe, switchMap } from "rxjs";
import { BookApiService } from "./book-api.service";
import { tapResponse } from "@ngrx/operators";

interface bookState {
  books: Book[];
}

const initialState: bookState = {
  books: [],
};

export const SignalStore = signalStore(
  { providedIn: "root" },
  withState(initialState),
  withMethods(({ books, ...store }, service = inject(BookApiService)) => ({
    getAll() {
      return books;
    },
    getOne(isbn: string) {
      return books().find((book) => book.isbn === isbn);
    },
    addAll(books: Book[]) {
      patchState(store, { books });
    },
    loadAll: rxMethod<void>(
      pipe(
        switchMap(() =>
          service.getAll().pipe(
            tapResponse({
              next: (books: Book[]) => patchState(store, { books }),
              error: () => {},
            })
          )
        )
      )
    ),
    create(book: Book) {
      rxMethod<Book>(
        pipe(
          switchMap(() =>
            service.create(book).pipe(
              tapResponse({
                next: (book: Book) =>
                  patchState(store, { books: [...books(), book] }),
                error: () => {},
              })
            )
          )
        )
      );
    },
  }))
);
