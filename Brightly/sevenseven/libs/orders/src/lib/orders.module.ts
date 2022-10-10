import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route, Routes } from '@angular/router';
import { CartService } from './services/cart.service';
import {ButtonModule} from 'primeng/button';
import { CartIconComponent } from './components/cart-icon/cart-icon.component';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import {BadgeModule} from 'primeng/badge';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import {InputNumberModule} from 'primeng/inputnumber';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersModule } from '@sevenseven/users';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import { ThankYouComponent } from './pages/thank-you/thank-you.component';
import {DropdownModule} from 'primeng/dropdown';
import {InputMaskModule} from 'primeng/inputmask';
import {InputTextModule} from 'primeng/inputtext';

export const ordersRoutes: Routes = [

  
 
  {
    path: 'cart',
    component: CartPageComponent
  },
  {
    path: 'checkout',
    component: CheckoutPageComponent
  },
  {
    path: 'success',
    component: ThankYouComponent
  }


];

@NgModule({
    imports: [CommonModule, RouterModule, ButtonModule, RouterModule.forChild(ordersRoutes), InputMaskModule, InputTextModule, BadgeModule, InputNumberModule, FormsModule, UsersModule, ReactiveFormsModule, DropdownModule],
    declarations: [
      CartIconComponent, OrderSummaryComponent, CartPageComponent, CheckoutPageComponent, ThankYouComponent
      ],
      exports: [
        CartIconComponent, OrderSummaryComponent, CartPageComponent, CheckoutPageComponent, ThankYouComponent
      ]
})
export class OrdersModule {

    constructor(cartService: CartService) {
        cartService.initCartLocalStorage();
      }
    
}
