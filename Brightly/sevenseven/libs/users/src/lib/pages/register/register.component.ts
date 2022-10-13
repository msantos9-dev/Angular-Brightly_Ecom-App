import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { lastValueFrom, timer } from 'rxjs';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { LocalstorageService } from '../../services/localstorage.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'users-register',
  templateUrl: './register.component.html',
  styles: [],
})
export class RegisterComponent implements OnInit {
  registerFormGroup!: FormGroup | any;
  isSubmitted = false;
  authError = false;
  authMessage = 'Email or Password are wrong';

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private auth: AuthService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._initUserForm();
  }
  private _initUserForm() {
    this.registerFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.registerFormGroup.invalid) return;
    const user: User = {
      password: this.registerForm.password.value,
      email: this.registerForm.email.value,
      name: this.registerForm.name.value,
      phone: this.registerForm.phone.value,
    };
    this._registerUser(user);
  }
  get registerForm() {
    return this.registerFormGroup.controls;
  }
  private _registerUser(user: User) {
    this.auth
      .register(user.email, user.password, user.name, user.phone)
      .subscribe({
        complete: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: `Hi! ${user.name}, Your are now registered visit your profile to add your complete details!`,
          });
          const source$ = timer(2000);
          lastValueFrom(source$).then((done) => {
            this.router.navigate(['/login']);
          });
        },
        error: (error: HttpErrorResponse) => {
          this.authError = true;
          if (error.status == 400) {
            this.authMessage = 'Email is already taken Registration failed!!';
          }
        },
      });
  }
  loginUser(){
    this.router.navigate(['/login']);
  }
}
