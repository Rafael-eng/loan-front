import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {User} from '../models/user.model';
import {Observable, tap} from 'rxjs';
import {PagedUserResponse} from '../models/paged-user-response.model';


@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private apiUrl: string = 'http://localhost:8181/api/user';
  constructor(private http: HttpClient) {}

  getAll(page: number, size: number): Observable<PagedUserResponse<User>> {
    return this.http.get<PagedUserResponse<User>>(`${this.apiUrl}?page=${page-1}&size=${size}`);
  }

  getAllList(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}?all=true`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<any>(`${this.apiUrl}`, user).pipe(tap());
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<any>(`${this.apiUrl}`, user).pipe(tap());
  }


}
