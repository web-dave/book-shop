import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-books',
    templateUrl: './books.component.html',
    styleUrls: ['./books.component.scss'],
    imports: [RouterOutlet]
})
export class BooksComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
