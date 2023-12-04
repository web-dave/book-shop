import { Component, OnInit, computed, inject } from "@angular/core";
import { BookApiService } from "../../services/book-api.service";
import { SignalStore } from "../../services/book-signal.store";
import { Book } from "../../models/book";

@Component({
  selector: "ws-book-list",
  templateUrl: "./book-list.component.html",
  styleUrls: ["./book-list.component.scss"],
})
export class BookListComponent implements OnInit {
  books$$$ = inject(SignalStore).getAll();

  constructor() {}

  ngOnInit(): void {}
}
