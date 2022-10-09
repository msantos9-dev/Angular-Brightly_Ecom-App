import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {CardModule} from 'primeng/card';
import {ToastModule} from 'primeng/toast';

import {DividerModule} from 'primeng/divider';

const usersRoutes:Routes = [

  {path: 'login',
    component: LoginComponent}

];

@NgModule({
    imports: [CommonModule, RouterModule, RouterModule.forChild(usersRoutes), FormsModule, ReactiveFormsModule, ButtonModule, InputTextModule, CardModule, DividerModule, ToastModule],
    declarations: [
      LoginComponent
    ],
    exports: [RouterModule]
})
export class UsersModule {}
