import { Component, OnInit, inject } from "@angular/core";
import { BookApiService } from "../../services/book-api.service";

@Component({
  selector: "ws-book-list",
  templateUrl: "./book-list.component.html",
  styleUrls: ["./book-list.component.scss"],
})
export class BookListComponent implements OnInit {
  books$ = inject(BookApiService).all();
  constructor() {}

  ngOnInit(): void {}
}
