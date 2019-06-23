export interface Book {
  isbn: string;
  title: string;
  description: string;
  firstThumbnailUrl: string;
  authors: {
    name: string
  }[];
}
