import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Admin, Users } from 'src/assets/test-data/data';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isAdmin:boolean = false;
  canEdit:boolean= false;
  hide = true;
  rehide = true;
  user:any;
  dataSource!: User[];
  
  signupForm:FormGroup = new FormGroup({
    name : new FormControl('', [Validators.required]),
    address : new FormControl('', [Validators.required]),
    phone : new FormControl('', [Validators.required,Validators.max(9999999999),Validators.min(6000000000)]),
    email : new FormControl('', [Validators.required, Validators.email]),
    password : new FormControl('', []),
    })
    userForm:FormGroup = new FormGroup({
      name : new FormControl('', [Validators.required]),
      address : new FormControl('', [Validators.required]),
      phone : new FormControl('', [Validators.required,Validators.max(9999999999),Validators.min(6000000000)]),
      email : new FormControl('', [Validators.required, Validators.email]),
      password : new FormControl('', [Validators.required]),
      })
    displayedColumns: string[] = ['id', 'nameOfUser', 'address', 'phone', 'email'];
   

  constructor(
    private router : Router,
    private authService : AuthService,
    private toastService : ToastrService,
    private userService : UsersService
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(window.localStorage.getItem('ud') || "");
    console.log(localStorage.getItem('ud') );
    this.isAdmin = this.user.isAdmin === "000" ? false : true;

    this.userService.getAllUsers().subscribe((res:any) =>{
      console.log("====> users",res);
      if(res.success){
        this.dataSource = res.data;
      }
    })

    // this.dataSource = Users;
    this.patchForm();
  }

  getUsers(){
    this.userService.getAllUsers().subscribe((res:any) =>{
      console.log("====> users",res);
      if(res.success){
        this.dataSource = res.data;
      }
    })
  }

  patchForm(){
    this.signupForm.get('name')?.setValue(this.user.nameOfUser);
    this.signupForm.get('address')?.setValue(this.user.address);
    this.signupForm.get('phone')?.setValue(this.user.phone);
    this.signupForm.get('email')?.setValue(this.user.email);
  }


  getErrorMessage() {
    if (this.signupForm.get("email")?.hasError('required')) {
      return 'Email/Username is required';
    }

    return this.signupForm.get("email")?.hasError('email') ? 'Not a valid email' : '';
  }

  submitForm(form:User){
    this.user.nameOfUser = form.name;
    this.user['name'] = form.name;
    this.user.email = form.email;
    this.user.address = form.address;
    this.user.phone = form.phone;
    if(form.password !== ""){
      this.user["password"] = form.password;
      this.user.pwd = form.password;
    }else{
      this.user["password"] = this.user.pwd;
    }
    console.log("edit ======>",form);
    this.userService.updateUser(this.user).subscribe((res:any) =>{
      console.log("====> update user",res);
      if(res.success){
        this.canEdit = false
        localStorage.setItem('ud', JSON.stringify(this.user));
        this.toastService.success("User updated Successfull!");
      }else{
        this.toastService.error("User can't be updated!");
      }
    })
  }

  logout(){
    if(this.authService.logout()){
      this.router.navigate(['/login']);
    }
  }

  addUserForm(form:User){
    console.log("=======>form",form);
    this.authService.checkEmail({email:form.email}).subscribe((res:any) =>{
      if(!res.success){
        this.userService.addUser(form).subscribe((res:any) =>{
          console.log("====> add user",res);
          if(res.success){
            this.toastService.success("User added Successfull!");
            this.userForm.reset();
            this.getUsers();
          }
        })
      }else{
        this.toastService.error("Email/Username already exists!");
      }
    })
  }
}
