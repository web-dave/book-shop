import { Component, OnInit, inject } from "@angular/core";
import { BookApiService } from "../../services/book-api.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Book } from "../../models/book";

@Component({
  selector: "ws-new-book",
  templateUrl: "./new-book.component.html",
  styleUrls: ["./new-book.component.scss"],
})
export class NewBookComponent {
  service = inject(BookApiService);

  bookForm = new FormGroup({
    isbn: new FormControl("", [Validators.required, Validators.minLength(3)]),
    numPages: new FormControl(0, [Validators.required, Validators.min(1)]),
    title: new FormControl("", [Validators.required]),
    author: new FormControl("", [Validators.required]),
    id: new FormControl("", []),
    subtitle: new FormControl(""),
    abstract: new FormControl(""),
    publisher: new FormControl(""),
    price: new FormControl(""),
    cover: new FormControl(""),
  });

  submit(): void {
    this.service.create(this.bookForm.getRawValue() as Book).subscribe();
  }
}
