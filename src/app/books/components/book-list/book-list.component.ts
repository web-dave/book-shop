import { Component, inject, ChangeDetectionStrategy } from "@angular/core";
import { BookCardComponent } from "../book-card/book-card.component";
import { bookStore } from "../../store/state";

@Component({
  selector: "ws-book-list",
  templateUrl: "./book-list.component.html",
  styleUrls: ["./book-list.component.scss"],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [BookCardComponent],
})
export class BookListComponent {
  private readonly store = inject(bookStore);
  books = this.store.books;
}
