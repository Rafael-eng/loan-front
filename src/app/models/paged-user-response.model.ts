export interface PagedUserResponse<T> {
  _embedded: {
    userResponseList:T[];
  },
  page: {
    size: number;
    number: number;
    totalElements: number;

  };
}
