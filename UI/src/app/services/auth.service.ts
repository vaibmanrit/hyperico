import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http : HttpClient,
   
  ) { }

  login(credentials:any):any{
    return this.http.post(`${environment.HOST}`+ '/api/user/login',credentials);
  }

  checkEmail(req:any){
    return this.http.post(`${environment.HOST}`+ '/api/user/checkEmail',req);
  }

  logout(){
    localStorage.removeItem('id');
    localStorage.removeItem('ud');
    localStorage.clear();
    return true;
  }

  isLoggedIn(){
    if(localStorage.getItem('ud')){
      return true;
    }
    localStorage.clear();
    return false;
  }
}
