import { Component, OnInit, inject } from "@angular/core";
import { BookApiService } from "./services/book-api.service";
import { SignalStore } from "./services/book-signal.store";

@Component({
  selector: "app-books",
  templateUrl: "./books.component.html",
  styleUrls: ["./books.component.scss"],
})
export class BooksComponent implements OnInit {
  books$ = inject(SignalStore).loadAll();

  ngOnInit(): void {}
}
