import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Book } from "../models/book";

@Injectable({
  providedIn: "root",
})
export class BookApiService {
  private http = inject(HttpClient);

  all(): Observable<Book[]> {
    return this.http.get<Book[]>(`http://localhost:4730/books`);
  }

  one(isbn: string): Observable<Book> {
    return this.http.get<Book>(`http://localhost:4730/books/${isbn}`);
  }

  create(book: Partial<Book>): Observable<Book> {
    return this.http.post<Book>(`http://localhost:4730/books`, book);
  }
}
