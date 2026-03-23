import { Component, OnInit, inject } from "@angular/core";
import { BookApiService } from "../../services/book-api.service";
import { BookCardComponent } from "../book-card/book-card.component";
import { AsyncPipe } from "@angular/common";

@Component({
    selector: "ws-book-list",
    templateUrl: "./book-list.component.html",
    styleUrls: ["./book-list.component.scss"],
    imports: [BookCardComponent, AsyncPipe]
})
export class BookListComponent implements OnInit {
  books$ = inject(BookApiService).all();
  constructor() {}

  ngOnInit(): void {}
}
