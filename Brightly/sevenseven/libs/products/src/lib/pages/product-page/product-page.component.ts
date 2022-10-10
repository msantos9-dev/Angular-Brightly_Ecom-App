import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';
import { CartItem, CartService } from '@sevenseven/orders';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'products-product-page',
  templateUrl: './product-page.component.html',
  styles: []
})
export class ProductPageComponent implements OnInit, OnDestroy {
  product: Product | undefined;
  endSubs$: Subject<any> = new Subject();
  quantity = 1;

  constructor(
    private prodService: ProductsService, 
    private route: ActivatedRoute,
    private cartService: CartService,
    private messageService: MessageService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['productid']) {
        this._getProduct(params['productid']);
      }
    });
  }

  ngOnDestroy(): void {
    this.endSubs$.next(0);
    this.endSubs$.complete();
  }

  addProductToCart() {
    const cartItem: CartItem = {
      productId: this.product?.id,
      quantity: this.quantity
    };
    this.messageService.add({severity:'success', summary:'Item Successfully added', detail:'You have added product successfully'});
    this.cartService.setCartItem(cartItem);
  }// eslint-disable-line @typescript-eslint/no-empty-function

  private _getProduct(id: string) {
    this.prodService
      .getProduct(id)
      .pipe(takeUntil(this.endSubs$))
      .subscribe((resProduct) => {
        this.product = resProduct;
      });
  }
}
