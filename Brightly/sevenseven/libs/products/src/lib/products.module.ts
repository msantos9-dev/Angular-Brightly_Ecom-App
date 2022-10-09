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
import {InputNumberModule} from 'primeng/inputnumber';
import {RatingModule} from 'primeng/rating';
import { UiModule } from '@sevenseven/ui';
import { FormsModule } from '@angular/forms';

import {CheckboxModule} from 'primeng/checkbox'


export const productsRoutes: Routes = [
  {
    path: 'products', component: ProductsListComponent
  },
  {
    path: 'category/:categoryid',
    component: ProductsListComponent
  },
  {
    path: 'products/:productid',
    component: ProductPageComponent
  }

];

@NgModule({
  imports: [CommonModule, OrdersModule, RouterModule.forChild(productsRoutes), ButtonModule, InputNumberModule, RatingModule,UiModule, FormsModule,CheckboxModule],
  declarations: [
    ProductSearchComponent,
    CategoriesBannerComponent,
    ProductItemComponent,
    FeaturedProductsComponent,
    ProductsListComponent,
    ProductPageComponent
  ],
  exports: [
    ProductSearchComponent,
    CategoriesBannerComponent,
    ProductItemComponent,
    FeaturedProductsComponent,
    ProductsListComponent,
    ProductPageComponent
  ]

})
export class ProductsModule {}
