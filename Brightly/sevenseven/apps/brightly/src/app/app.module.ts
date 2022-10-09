import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { UiModule } from 'libs/ui/src/lib/ui.module';

//primeng
import {AccordionModule} from 'primeng/accordion';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
    declarations: [AppComponent, NxWelcomeComponent, HomePageComponent, ProductListComponent, HeaderComponent, FooterComponent],
    imports: [BrowserModule, AppRoutingModule, UiModule,
        //primeng
        AccordionModule, BrowserAnimationsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
