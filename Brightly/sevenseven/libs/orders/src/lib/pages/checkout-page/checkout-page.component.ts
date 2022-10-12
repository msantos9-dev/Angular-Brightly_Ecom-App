import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalstorageService, UsersService } from '@sevenseven/users';
import { Cart } from '../../models/cart';
import { Order } from '../../models/order';
import { CartService } from '../../services/cart.service';
import { OrdersService } from '../../services/orders.service';

import * as countriesLib from 'i18n-iso-countries';
import { Subject, takeUntil } from 'rxjs';
declare const require: (arg0: string) => countriesLib.LocaleData;

@Component({
  selector: 'orders-checkout-page',
  templateUrl: './checkout-page.component.html'
})
export class CheckoutPageComponent implements OnInit, OnDestroy  {


  constructor(
    private router: Router,
    private usersService: UsersService,
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private ordersService: OrdersService,
    private localStorageToken: LocalstorageService
  ) {}
  checkoutFormGroup: FormGroup | any; // eslint-disable-line @typescript-eslint/no-explicit-any
  isSubmitted = false;
  orderItems: any = []; // eslint-disable-line @typescript-eslint/no-explicit-any
  userId : any ; // eslint-disable-line @typescript-eslint/no-explicit-any
  countries : any = []; // eslint-disable-line @typescript-eslint/no-explicit-any
  unSubscribe$: Subject<any> = new Subject();


  ngOnInit(): void {
    this._initCheckoutForm();
    this._autoFillUserData();
    this._getCartItems();
    this._getCountries();
    
  }

  
  private _autoFillUserData() {
    this.usersService
      .observeCurrentUser()
      .pipe(takeUntil(this.unSubscribe$))
      .subscribe((user:any) => {
        if (user) {
          this.userId = user.id;
          this.checkoutForm.name.setValue(user?.name);
          this.checkoutForm.email.setValue(user?.email);
          this.checkoutForm.phone.setValue(user?.phone);
          this.checkoutForm.street.setValue(user?.street);
          this.checkoutForm.apartment.setValue(user?.apartment);
          this.checkoutForm.zip.setValue(user?.zip);
          this.checkoutForm.city.setValue(user?.city);
          this.checkoutForm.country.setValue(user?.country);
        }
      });
  }

  
  ngOnDestroy(): void {
    this.unSubscribe$.next(this.unSubscribe$);
    this.unSubscribe$.complete();
  }


  private _initCheckoutForm() {
    this.checkoutFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      phone: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      zip: ['', Validators.required],
      apartment: ['', Validators.required],
      street: ['', Validators.required]
    });
  }

  private _getCartItems() {
    const cart: Cart = this.cartService.getCart();
    this.orderItems = cart.items?.map((item) => {
      return {
        product: item.productId,
        quantity: item.quantity
      };
    });
  }

  private _getCountries() {
    countriesLib.registerLocale(require('i18n-iso-countries/langs/en.json'));

    this.countries = Object.entries(countriesLib.getNames('en', { select: 'official' })).map((entry) => {
        return {
            id: entry[0],
            name: entry[1]
        };
    });
}

  backToCart() {
    this.router.navigate(['/cart']);
  }

  placeOrder() {
    this.isSubmitted = true;
    if (this.checkoutFormGroup?.invalid) {
      return;
    }

    const order: Order = {
      orderItems: this.orderItems,
      shippingAddress1: this.checkoutForm?.['street'].value,
      shippingAddress2: this.checkoutForm?.['apartment'].value,
      city: this.checkoutForm?.['city'].value,
      zip: this.checkoutForm?.['zip'].value,
      country: this.checkoutForm?.['country'].value,
      phone: this.checkoutForm?.['phone'].value,
      status: 0,
      user: this.userId,
      dateOrdered: `${Date.now()}`
    };

    this.ordersService.createOrder(order).subscribe(
      () => {
        //redirect to thank you page // payment
        this.cartService.emptyCart();
        this.router.navigate(['/success']);
      },
      () => {
        //display some message to user
      }
    );
  }

  get checkoutForm() {
    return this.checkoutFormGroup?.controls;
  }
}
