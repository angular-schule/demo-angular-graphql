import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Book } from './book';

import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookStoreService {

  constructor(private apollo: Apollo) { }

  getAll() {

    return this.apollo.query({
      query: gql`
        query BookList {
          books {
            isbn
            title
            description
            rating
            firstThumbnailUrl
          }
        }`
      })
      .pipe(
        map(({ data }) => data['books'])
      );
  }

  getSingle(isbn: string) {

    return this.apollo.query({
      query: gql`
        query BookSingle($isbn: ID!) {
          book(isbn: $isbn) {
            isbn
            title
            description
            rating
            firstThumbnailUrl
          }
        }`,
        variables: {
          isbn,
        }
      })
      .pipe(
        map(({ data }) => data['book'])
      );
  }
}
