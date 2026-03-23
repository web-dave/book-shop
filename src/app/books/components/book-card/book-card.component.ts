import { Component, DoCheck, Input } from '@angular/core';
import { Book } from '../../models/book';

@Component({
    selector: 'ws-book-card',
    templateUrl: './book-card.component.html',
    styleUrls: ['./book-card.component.scss'],
    standalone: false
})
export class BookCardComponent implements DoCheck {
  @Input() content: Book | undefined;

  ngDoCheck() {}
}
