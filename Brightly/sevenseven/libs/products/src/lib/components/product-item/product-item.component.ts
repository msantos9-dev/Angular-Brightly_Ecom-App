import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../models/product';

@Component({
  selector: 'products-product-item',
  templateUrl: './product-item.component.html',
  styles: []
})
export class ProductItemComponent implements OnInit {
  @Input() product!: Product;

  constructor() {} // eslint-disable-line @typescript-eslint/no-empty-function

  ngOnInit(): void {} // eslint-disable-line @angular-eslint/no-empty-lifecycle-method, @typescript-eslint/no-empty-function
}
