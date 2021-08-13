import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide = true;

  loginForm:FormGroup = new FormGroup({
  email : new FormControl('', [Validators.required, Validators.email]),
  password : new FormControl('', [Validators.required]),
  })

 
  constructor(
    private router : Router,
    private authService : AuthService,
    private toastService : ToastrService
  ) { }

  ngOnInit(): void {
  }

  getErrorMessage() {
    if (this.loginForm.get("email")?.hasError('required')) {
      return 'Email/Username is required';
    }

    return this.loginForm.get("email")?.hasError('email') ? 'Not a valid email' : '';
  }

  redirectToSignup(){
    this.router.navigate(['/signup']);
  }


  submitForm(form:any){
    console.log("=======>form",form);
    this.authService.login(form).subscribe((res:any) =>{
      if(res.success){
        localStorage.setItem('id', res.data[0].id);
        localStorage.setItem('ud', JSON.stringify(res.data[0]));
        this.toastService.success("Login Successfull!");
        this.router.navigate(['/home']);
      }else{
        this.toastService.error("Login Unsuccessfull!");
      }
    })
    // if(this.authService.login(form).success == 1){
    //   this.toastService.success("Login Successfull!");
    //   this.router.navigate(['/home']);
    // }else{
    //   this.toastService.error("Login Unsuccessfull!");
    // }

  }
}
