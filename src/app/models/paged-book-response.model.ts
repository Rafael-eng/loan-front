export interface PagedBookResponse<T> {
  _embedded: {
    bookResponseList:T[];
  },
  page: {
    size: number;
    number: number;
    totalElements: number;

  };
}
