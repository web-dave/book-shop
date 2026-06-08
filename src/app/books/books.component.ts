import { Component, OnInit, effect, inject } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { bookStore } from "./store/state";

@Component({
  selector: "app-books",
  templateUrl: "./books.component.html",
  styleUrls: ["./books.component.scss"],
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
