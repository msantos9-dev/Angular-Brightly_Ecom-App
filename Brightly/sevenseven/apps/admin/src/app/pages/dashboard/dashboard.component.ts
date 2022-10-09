import { Component, OnInit } from '@angular/core';
import { OrdersService } from '@sevenseven/orders';
import { ProductsService } from '@sevenseven/products';
import { UsersService } from '@sevenseven/users';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  statistics = [];

  constructor(private userService: UsersService,
    private productService: ProductsService,
    private ordersService: OrdersService
) { }

  ngOnInit(): void {
    
    combineLatest([
      this.ordersService.getOrdersCount(),
      this.productService.getProductsCount(),
      this.userService.getUsersCount(),
      this.ordersService.getTotalSales()
    ]).subscribe((values: any) => {
      this.statistics = values;
    });

  }

}
