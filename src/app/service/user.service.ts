import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BaseService} from '../base';
import {UserDTO} from '../dto/user-dto';


@Injectable({
  providedIn: 'root',
})
export class UsersService extends BaseService<UserDTO> {
  constructor(_http: HttpClient) {
    super(_http, 'api/user');
  }
}
