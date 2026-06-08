import { Component, OnInit, effect, inject, ChangeDetectionStrategy } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { bookStore } from "./store/state";

@Component({
  selector: "app-books",
  templateUrl: "./books.component.html",
  styleUrls: ["./books.component.scss"],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [RouterOutlet],
})
export class BooksComponent implements OnInit {
  private store = inject(bookStore);
  state = this.store.state();
  ngOnInit(): void {
    this.store.loadAll("");
  }
  foo = effect(() => {
    console.log("==>", this.state.selected());
  });
}
