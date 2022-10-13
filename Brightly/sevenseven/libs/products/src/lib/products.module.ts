import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route, Routes } from '@angular/router';
import { ProductSearchComponent } from './components/product-search/product-search.component';
import { CategoriesBannerComponent } from './components/categories-banner/categories-banner.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { FeaturedProductsComponent } from './components/featured-products/featured-products.component';
import { OrdersModule } from '@sevenseven/orders';
import { ButtonModule } from 'primeng/button';
import { ProductsListComponent } from './pages/products-list/products-list.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { RatingModule } from 'primeng/rating';
import { UiModule } from '@sevenseven/ui';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { CheckboxModule } from 'primeng/checkbox';
import { ProductCarouselComponent } from './components/product-carousel/product-carousel.component';
import {CarouselModule} from 'primeng/carousel';
import {SliderModule} from 'primeng/slider';
import {ProductsRoutingModule} from './products-routing.module';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
    imports: [
        CommonModule,
        OrdersModule,
        ProductsRoutingModule,
        ButtonModule,
        InputNumberModule,
        RatingModule,
        HttpClientModule,
        UiModule,
        ToastModule,
        FormsModule,
        CheckboxModule,
        CarouselModule,
        SliderModule
    ],
    declarations: [
        ProductSearchComponent,
        CategoriesBannerComponent,
        ProductItemComponent,
        FeaturedProductsComponent,
        ProductsListComponent,
        ProductPageComponent,
        ProductCarouselComponent,
        ProductCarouselComponent
    ],
    exports: [ProductSearchComponent, ProductCarouselComponent, CategoriesBannerComponent, ProductItemComponent, FeaturedProductsComponent, ProductsListComponent, ProductPageComponent]
})
export class ProductsModule {}
