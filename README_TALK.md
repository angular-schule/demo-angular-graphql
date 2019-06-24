# Von 0 auf 100

## 1. Schematic installieren

`ng add apollo-angular`

## 2. Url zum Server angeben

`src/app/graphql.module.ts` und URI `https://api.angular.schule/graphql`

```ts
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'no-cache'
      },
      query: {
        fetchPolicy: 'no-cache'
      }
    }
```

## 3. Query 1: Service anpassen

a) `import gql from 'graphql-tag';`
b) ctor: `private apollo: Apollo`
c) Query:

```ts
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

    return this.apollo.query<any>({ query }).pipe(
        map(result => result.data.books)
      );
  }
```

## 3. Query 2: Service anpassen

```ts
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
```

## 4. Query 3: Service anpassen

```ts
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
```


 

