import { Injectable } from '@angular/core';

import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import {
  BookListQuery,
  BookSingleQuery,
  BookSingleQueryVariables,
  CreateBookMutation,
  CreateBookMutationVariables
} from '../../generated/graphql';

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

    return this.apollo.watchQuery<BookListQuery>({ query })
      .valueChanges
      .pipe(
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

    return this.apollo.watchQuery<BookSingleQuery, BookSingleQueryVariables>({
      query,
      variables: { isbn }
    })
    .valueChanges
    .pipe(
      map(result => result.data.book)
    );
  }

  createBook(book: { isbn: string; title: string; description: string }) {
    const mutation = gql`
      mutation CreateBook($book: BookInput!) {
        createBook(book: $book) {
          isbn
        }
      }`;

    return this.apollo.mutate<CreateBookMutation, CreateBookMutationVariables>({
      mutation,
      variables: { book }
    });
  }

}
