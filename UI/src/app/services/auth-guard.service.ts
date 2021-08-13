import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(
    private router : Router,
    private auth : AuthService,
    private toast :ToastrService
  ) { }

  canActivate():boolean{
    if(this.auth.isLoggedIn()){
      return true;
    }else{
      this.router.navigate(['/login']);
      this.toast.error("Login Again!")
      return false;
    }
  }
}
