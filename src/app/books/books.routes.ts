import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BooksComponent } from "./books.component";
import { BookDetailComponent } from "./components/book-detail/book-detail.component";
import { BookListComponent } from "./components/book-list/book-list.component";
import { NewBookComponent } from "./components/new-book/new-book.component";
import { bookStore, isbnResolver } from "./store/state";

const bookRoutes: Routes = [
  {
    path: "",
    component: BooksComponent,
    providers: [bookStore],
    children: [
      {
        path: "",
        component: BookListComponent,
        pathMatch: "full",
      },
      {
        path: "new",
        component: NewBookComponent,
      },
      {
        path: ":isbn",
        component: BookDetailComponent,
        resolve: [isbnResolver],
      },
    ],
  },
];
export default bookRoutes;
