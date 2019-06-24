import gql from "graphql-tag";
import { Injectable } from "@angular/core";
import * as Apollo from "apollo-angular";
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Author = {
  __typename?: "Author";
  name?: Maybe<Scalars["String"]>;
  books?: Maybe<Array<Maybe<Book>>>;
};

export type Book = {
  __typename?: "Book";
  isbn: Scalars["ID"];
  title?: Maybe<Scalars["String"]>;
  subtitle?: Maybe<Scalars["String"]>;
  rating?: Maybe<Scalars["Int"]>;
  description?: Maybe<Scalars["String"]>;
  thumbnails?: Maybe<Array<Maybe<Thumbnail>>>;
  firstThumbnailUrl?: Maybe<Scalars["String"]>;
  authors?: Maybe<Array<Maybe<Author>>>;
  price?: Maybe<Scalars["Float"]>;
};

export type BookInput = {
  isbn?: Maybe<Scalars["String"]>;
  title?: Maybe<Scalars["String"]>;
  subtitle?: Maybe<Scalars["String"]>;
  rating?: Maybe<Scalars["Int"]>;
  description?: Maybe<Scalars["String"]>;
};

export type Mutation = {
  __typename?: "Mutation";
  createBook?: Maybe<Book>;
};

export type MutationCreateBookArgs = {
  book: BookInput;
};

export type Query = {
  __typename?: "Query";
  authors?: Maybe<Array<Maybe<Author>>>;
  books?: Maybe<Array<Maybe<Book>>>;
  book?: Maybe<Book>;
  isbnExists?: Maybe<Scalars["Boolean"]>;
  bookSearch?: Maybe<Array<Maybe<Book>>>;
};

export type QueryBookArgs = {
  isbn: Scalars["ID"];
};

export type QueryIsbnExistsArgs = {
  isbn: Scalars["ID"];
};

export type QueryBookSearchArgs = {
  searchTerm?: Maybe<Scalars["String"]>;
};

export type Thumbnail = {
  __typename?: "Thumbnail";
  url?: Maybe<Scalars["String"]>;
  title?: Maybe<Scalars["String"]>;
};

export type ThumbnailInput = {
  url?: Maybe<Scalars["String"]>;
  title?: Maybe<Scalars["String"]>;
};
export type BookListQueryVariables = {};

export type BookListQuery = { __typename?: "Query" } & {
  books: Maybe<
    Array<
      Maybe<
        { __typename?: "Book" } & Pick<Book, "isbn" | "title"> & {
            authors: Maybe<
              Array<Maybe<{ __typename?: "Author" } & Pick<Author, "name">>>
            >;
          }
      >
    >
  >;
};

export type BookSingleQueryVariables = {
  isbn: Scalars["ID"];
};

export type BookSingleQuery = { __typename?: "Query" } & {
  book: Maybe<
    { __typename?: "Book" } & Pick<
      Book,
      "isbn" | "title" | "description" | "firstThumbnailUrl"
    >
  >;
};

export type CreateBookMutationVariables = {
  book: BookInput;
};

export type CreateBookMutation = { __typename?: "Mutation" } & {
  createBook: Maybe<{ __typename?: "Book" } & Pick<Book, "isbn">>;
};

export const BookListDocument = gql`
  query BookList {
    books {
      isbn
      title
      authors {
        name
      }
    }
  }
`;

@Injectable({
  providedIn: "root"
})
export class BookListGQL extends Apollo.Query<
  BookListQuery,
  BookListQueryVariables
> {
  document = BookListDocument;
}
export const BookSingleDocument = gql`
  query BookSingle($isbn: ID!) {
    book(isbn: $isbn) {
      isbn
      title
      description
      firstThumbnailUrl
    }
  }
`;

@Injectable({
  providedIn: "root"
})
export class BookSingleGQL extends Apollo.Query<
  BookSingleQuery,
  BookSingleQueryVariables
> {
  document = BookSingleDocument;
}
export const CreateBookDocument = gql`
  mutation CreateBook($book: BookInput!) {
    createBook(book: $book) {
      isbn
    }
  }
`;

@Injectable({
  providedIn: "root"
})
export class CreateBookGQL extends Apollo.Mutation<
  CreateBookMutation,
  CreateBookMutationVariables
> {
  document = CreateBookDocument;
}
