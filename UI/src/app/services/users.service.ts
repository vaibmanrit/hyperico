import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http : HttpClient,
  ) { }

  getAllUsers():any{
    return this.http.get(`${environment.HOST}`+ '/api/user');
  }

  addUser(data:User){
    return this.http.post(`${environment.HOST}`+ '/api/user',data);
  }

  updateUser(data:User){
    return this.http.put(`${environment.HOST}`+ '/api/user',data);
  }
}
