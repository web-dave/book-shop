import { Component, DoCheck, Input } from '@angular/core';
import { Book } from '../../models/book';
import { MatCard, MatCardHeader, MatCardAvatar, MatCardTitle, MatCardSubtitle, MatCardContent, MatCardActions } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'ws-book-card',
    templateUrl: './book-card.component.html',
    styleUrls: ['./book-card.component.scss'],
    imports: [MatCard, MatCardHeader, MatCardAvatar, MatCardTitle, MatCardSubtitle, MatCardContent, MatCardActions, MatButton, RouterLink]
})
export class BookCardComponent implements DoCheck {
  @Input() content: Book | undefined;

  ngDoCheck() {}
}
