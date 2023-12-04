import { Component, OnInit, inject } from "@angular/core";
import { EMPTY, Observable, filter, map, switchMap } from "rxjs";
import { Book } from "../../models/book";
import { ActivatedRoute } from "@angular/router";
import { BookApiService } from "../../services/book-api.service";

@Component({
  selector: "ws-book-detail",
  templateUrl: "./book-detail.component.html",
  styleUrls: ["./book-detail.component.scss"],
})
export class BookDetailComponent implements OnInit {
  service = inject(BookApiService);
  book$ = inject(ActivatedRoute).params.pipe(
    switchMap((params) => this.service.one(params["isbn"])),
    filter((data) => data != undefined),
    map((book) => book as Book)
  );

  constructor() {}

  ngOnInit(): void {}
}
