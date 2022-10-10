import { Component, OnInit, Input } from '@angular/core';
import { CartItem } from 'libs/orders/src/lib/models/cart';
import { CartService } from '@sevenseven/orders';
import { Product } from '../../models/product';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'products-product-item',
  templateUrl: './product-item.component.html',
  styles: []
})
export class ProductItemComponent implements OnInit {
  @Input() product: Product | undefined;

  constructor(private cartService: CartService, private messageService: MessageService) {}

  ngOnInit(): void {} // eslint-disable-line @angular-eslint/no-empty-lifecycle-method, @typescript-eslint/no-empty-function

  addProductToCart() {
    const cartItem: CartItem = {
      productId: this.product?.id,
      quantity: 1
    };
    this.cartService.setCartItem(cartItem);
    this.messageService.add({severity:'success', summary:'Item Successfully added', detail:'You have added product successfully'});
  }
}
