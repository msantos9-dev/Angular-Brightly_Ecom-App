import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';

import { ProductsModule } from 'libs/products/src/lib/products.module';
import { UiModule } from 'libs/ui/src/lib/ui.module';

//primeng
import {AccordionModule} from 'primeng/accordion';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NavComponent } from './shared/nav/nav.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService, JwtInterceptor, UsersModule } from '@sevenseven/users';
import { MessageService, ConfirmationService } from 'primeng/api';
import { OrdersModule } from '@sevenseven/orders';
import {ButtonModule} from 'primeng/button';

import {CarouselModule} from 'primeng/carousel';

//ngrx
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
    declarations: [AppComponent, NxWelcomeComponent, HomePageComponent, HeaderComponent, FooterComponent, NavComponent],
    imports: [BrowserModule, AppRoutingModule, UiModule, ProductsModule, OrdersModule, UsersModule,
        //primeng
        AccordionModule, BrowserAnimationsModule, HttpClientModule, CarouselModule , ButtonModule,

        //ngrx
        StoreModule.forRoot({}), EffectsModule.forRoot([]),
    ],
    providers: [MessageService, ConfirmationService, 
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }, AuthService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
