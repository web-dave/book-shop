import { Component, OnInit, inject, input, ChangeDetectionStrategy } from "@angular/core";
import { EMPTY, Observable, filter, map, switchMap } from "rxjs";
import { Book } from "../../models/book";
import { ActivatedRoute } from "@angular/router";
import { BookApiService } from "../../services/book-api.service";
import {
  MatCard,
  MatCardHeader,
  MatCardTitle,
  MatCardSubtitle,
  MatCardImage,
  MatCardContent,
} from "@angular/material/card";
import { AsyncPipe } from "@angular/common";
import { bookStore } from "../../store/state";

@Component({
  selector: "ws-book-detail",
  templateUrl: "./book-detail.component.html",
  styleUrls: ["./book-detail.component.scss"],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    MatCardImage,
    MatCardContent,
  ],
})
export class BookDetailComponent implements OnInit {
  isbn = input<string>();
  store = inject(bookStore);
  book = this.store.byIsbn;

  ngOnInit(): void {}
}
