import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BookStoreService {

  constructor() { }

  getAll() {
    return of([]);
  }

  getSingle(isbn: string) {
    return EMPTY;
  }

  createBook(book: { isbn: string, title: string, description: string }) {
    return EMPTY;
  }

}
