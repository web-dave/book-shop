import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BooksComponent } from "./books.component";
import { BookDetailComponent } from "./components/book-detail/book-detail.component";
import { BookListComponent } from "./components/book-list/book-list.component";
import { NewBookComponent } from "./components/new-book/new-book.component";

const bookRoutes: Routes = [
  {
    path: "",
    component: BooksComponent,
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
      },
    ],
  },
];
export default bookRoutes;
