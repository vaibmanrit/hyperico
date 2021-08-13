import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  hide = true;
  reHide = true;
  signupForm:FormGroup = new FormGroup({
    name : new FormControl('', [Validators.required]),
    address : new FormControl('', [Validators.required]),
    phone : new FormControl('', [Validators.required]),
    email : new FormControl('', [Validators.required, Validators.email]),
    password : new FormControl('', [Validators.required]),
    confirmPassword:new FormControl('', [Validators.required]),
    })

 
    constructor(
      private router : Router,
      private toastService : ToastrService,
      private userService : UsersService,
      private authService : AuthService,
    ) { }

  ngOnInit(): void {
  }

  getErrorMessage() {
    if (this.signupForm.get("email")?.hasError('required')) {
      return 'Email/Username is required';
    }

    return this.signupForm.get("email")?.hasError('email') ? 'Not a valid email' : '';
  }

  redirectToLogin(){
    this.router.navigate(['/login']);
  }

  checkForm(form:any){
    if(form.password !== form.confirmPassword){
      // console.log("Password does'nt match!");
      this.toastService.error("Password does'nt match!");
    }
    else{
      this.submitForm(form);
    }
  }

  submitForm(form:any){
    console.log("=======>form",form);
    this.authService.checkEmail({email:form.email}).subscribe((res:any) =>{
      if(!res.success){
        this.userService.addUser(form).subscribe((res:any) =>{
          console.log("====> add user",res);
          if(res.success){
            this.toastService.success("User added Successfull!");
            this.router.navigate(['/login']);
          }
        })
      }else{
        this.toastService.error("Email/Username already exists!");
      }
    })
   
    
  }

}
