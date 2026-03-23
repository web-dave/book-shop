import {
  Component,
  Injector,
  OnInit,
  inject,
  runInInjectionContext,
} from "@angular/core";
import { BookApiService } from "../../services/book-api.service";
import {
  FormGroup,
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from "@angular/forms";
import { Book } from "../../models/book";
import { MatFormField, MatError } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { MatButton } from "@angular/material/button";
import { bookStore } from "../../store/state";

@Component({
  selector: "ws-new-book",
  templateUrl: "./new-book.component.html",
  styleUrls: ["./new-book.component.scss"],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatError,
    MatButton,
  ],
})
export class NewBookComponent {
  // service = inject(BookApiService);
  private store = inject(bookStore);
  private injector = inject(Injector);

  bookForm = new FormGroup({
    isbn: new FormControl("", [Validators.required, Validators.minLength(3)]),
    numPages: new FormControl(0, [Validators.required, Validators.min(1)]),
    title: new FormControl("", [Validators.required]),
    author: new FormControl("", [Validators.required]),
    subtitle: new FormControl(""),
    abstract: new FormControl(""),
    publisher: new FormControl(""),
    price: new FormControl(""),
    cover: new FormControl(""),
  });

  submit(): void {
    runInInjectionContext(this.injector, () =>
      this.store.create(this.bookForm.getRawValue() as Book),
    );
    // this.service.create(this.bookForm.getRawValue() as Book).subscribe();
  }
}
