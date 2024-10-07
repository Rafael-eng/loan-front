import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Book} from '../models/book.model';
import {Observable, tap} from 'rxjs';
import {PagedBookResponse} from '../models/paged-book-response.model';


@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private apiUrl: string = 'http://localhost:8181/api/book';
  constructor(private http: HttpClient) {}

  getAll(page: number, size: number): Observable<PagedBookResponse<Book>> {
    return this.http.get<PagedBookResponse<Book>>(`${this.apiUrl}?page=${page-1}&size=${size}`);
  }

  searchFromGoogleApi(page: number, size: number, title: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/search?page=${page-1}&size=${size}&title=${title}`);
  }

  getAllWithoutLending(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/without-lending`);
  }

  getAllRecommended(page: number, size: number, userId: number = 1): Observable<PagedBookResponse<Book>> {
    return this.http.get<PagedBookResponse<Book>>(`${this.apiUrl}/recommendation?page=${page-1}&size=${size}&userId=${userId}`);
  }

  createBook(book: Book): Observable<Book> {
    return this.http.post<any>(`${this.apiUrl}`, book).pipe(tap());
  }

  updateBook(book: Book): Observable<Book> {
    return this.http.put<any>(`${this.apiUrl}`, book).pipe(tap());
  }

  existsIsbn(isbn: String, bookId:any): Observable<boolean> {
    return this.http.get<any>(`${this.apiUrl}/exists-by-isbn/${isbn}?bookId=${bookId}`);
  }

}
