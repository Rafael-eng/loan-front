export interface PagedLoanResponse<T> {
  _embedded: {
    loanResponseList:T[];
  },
  page: {
    size: number;
    number: number;
    totalElements: number;

  };
}
