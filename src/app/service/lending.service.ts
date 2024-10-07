import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {PagedBookResponse} from '../models/paged-book-response.model';
import {Book} from '../models/book.model';
import {PagedLoanResponse} from '../models/paged-loans-response-model';
import {Loan} from '../models/loan.model';

@Injectable({
  providedIn: 'root'
})
export class LendingService {
  private apiUrl: string = 'http://localhost:8181/api/loan';

  constructor(private http: HttpClient) {}

  createLending(userId: number, bookId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}?userId=${userId}&bookId=${bookId}`, {}).pipe(tap());
  }

  updateLending(loan: Loan): Observable<any> {
    return this.http.patch(`${this.apiUrl}`, loan).pipe(tap());
  }

  getAll(page: number, size: number): Observable<PagedLoanResponse<Loan>> {
    return this.http.get<PagedLoanResponse<Loan>>(`${this.apiUrl}?page=${page-1}&size=${size}`).pipe(tap());
  }

}
