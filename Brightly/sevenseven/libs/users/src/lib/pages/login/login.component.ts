import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { User } from '@sevenseven/users';
import { AuthService } from '../../services/auth.service';
import { LocalstorageService } from '../../services/localstorage.service';
import { UsersService } from '../../services/users.service';

@Component({
    selector: 'users-login',
    templateUrl: './login.component.html',
    styles: []
})
export class LoginComponent implements OnInit, OnDestroy{
    loginFormGroup!: FormGroup | any;
    isLogin = true;
    isSubmitted = false;
    authError = false;
    authMessage = 'Email or Password are wrong';

    constructor(private formBuilder: FormBuilder, private auth: AuthService, private localstorageService: LocalstorageService, private router: Router,
      private usersService:UsersService) {}

    ngOnInit(): void {
        this._initLoginForm();
        this.router.url.includes('register') ? this.isLogin = false : this.isLogin = true 
        this.loginForm['name'].setValidators([]);
        this.loginForm['name'].updateValueAndValidity();
        this.loginForm['phone'].setValidators([]);
        this.loginForm['phone'].updateValueAndValidity();
        console.log(this.isLogin);
    }
    ngOnDestroy(): void {
      window.location.reload();
    }
    private _initLoginForm() {
        this.loginFormGroup = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
            name: ['', Validators.required],
            phone: ['', Validators.required]
        });
    }
    onSubmit() {
        this.isSubmitted = true;
        if (this.loginFormGroup.invalid) return;
        this.auth.login(this.loginForm['email'].value, this.loginForm['password'].value).subscribe(
            (user) => {
                this.authError = false;
                this.localstorageService.setToken(user.token);
                this.router.navigateByUrl('/');
            },
            (error: HttpErrorResponse) => {
                this.authError = true;
                if (error.status !== 400) {
                    this.authMessage = 'Error in the Server, please try again later!';
                }
            }
        );
    }

    _register() {
      if(this.isLogin){
        this.router.navigate(['/register']);
      }else{
        if (this.loginForm.invalid) {
          return;
        }
        const user: User = {
          name: this.loginForm['name'].value,
          email: this.loginForm['email'].value,
          password: this.loginForm['password'].value,
          phone: this.loginForm['phone'].value,
        };
        
        this.usersService.createUser(user).subscribe(
          (user: User) => {
            console.log("1");
            this.isLogin = true;
          this.router.navigate(['/login']);   
        },
        () => {
          console.log("2");
        }
        );
        console.log("3");


      }
    }

    get loginForm() {
        return this.loginFormGroup.controls;
    }
}
