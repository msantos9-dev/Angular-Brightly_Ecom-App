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
import { ConfirmationService, MessageService } from 'primeng/api';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { RegisterComponent } from './pages/register/register.component';
import {InputMaskModule} from 'primeng/inputmask';
import { UserRoutingModule } from './user-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        DropdownModule,
        ReactiveFormsModule,
        ButtonModule,
        InputTextModule,
        CardModule,
        DividerModule,
        ToastModule,
        StoreModule.forFeature(fromUsers.USERS_FEATURE_KEY, fromUsers.usersReducer),
        EffectsModule.forFeature([UsersEffects]), ConfirmDialogModule, InputMaskModule,
        UserRoutingModule,
        HttpClientModule,
    ],
    declarations: [LoginComponent, ProfilePageComponent, ProfileIconComponent, ProfileIconComponent,RegisterComponent],
    exports: [RouterModule, LoginComponent, ProfileIconComponent, ProfileIconComponent ],
    providers: [UsersFacade, MessageService, ConfirmationService]
})
export class UsersModule{}
