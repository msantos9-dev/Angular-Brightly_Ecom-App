import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';

import { DividerModule } from 'primeng/divider';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromUsers from './state/users.reducer';
import { UsersEffects } from './state/users.effects';
import { UsersFacade } from './state/users.facade';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { ProfileIconComponent } from './components/profile-icon/profile-icon.component';

const usersRoutes: Routes = [
    { path: 'login', component: LoginComponent },
{ path: 'register', component: LoginComponent },
{ path: 'profile', component: ProfilePageComponent }];

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        RouterModule.forChild(usersRoutes),
        FormsModule,
        ReactiveFormsModule,
        ButtonModule,
        InputTextModule,
        CardModule,
        DividerModule,
        ToastModule,
        StoreModule.forFeature(fromUsers.USERS_FEATURE_KEY, fromUsers.usersReducer),
        EffectsModule.forFeature([UsersEffects])
    ],
    declarations: [LoginComponent, ProfilePageComponent, ProfileIconComponent, ProfileIconComponent],
    exports: [RouterModule, LoginComponent, ProfilePageComponent, ProfileIconComponent, ProfileIconComponent ],
    providers: [UsersFacade]
})
export class UsersModule {}
