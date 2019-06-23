# Von 0 auf 100

## 1. Schematic installieren

`ng add apollo-angular`

## 2. Url zum Server angeben

`src/app/graphql.module.ts` und URI `https://api.angular.schule/graphql`

## 3. Service anpassen

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




 

