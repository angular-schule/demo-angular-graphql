import { Injectable } from '@angular/core';

import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { Book } from './book';
import { of } from 'zen-observable';

@Injectable({
  providedIn: 'root'
})
export class BookStoreService {

  constructor(private apollo: Apollo) { }

  getAll() {

    const query = gql`
      query BookList {
        books {
          isbn
          title
          authors {
            name
          }
        }
      }`;

    return this.apollo.watchQuery<any>({ query }).valueChanges.pipe(
        map(result => result.data.books)
      );
  }

  getSingle(isbn: string) {

    const query = gql`
      query BookSingle($isbn: ID!) {
        book(isbn: $isbn) {
          isbn
          title
          description
          firstThumbnailUrl
        }
      }`;

    return this.apollo.query<any>({
      query,
      variables: { isbn }
    }).pipe(
      map(result => result.data.book)
    );
  }

  createBook(book: Partial<Book>) {
    const mutation = gql`
      mutation CreateBook($book: BookInput!) {
        createBook(book: $book) {
          isbn
        }
      }`;

    return this.apollo.mutate<any>({
      mutation,
      variables: { book }
    });
  }

}
