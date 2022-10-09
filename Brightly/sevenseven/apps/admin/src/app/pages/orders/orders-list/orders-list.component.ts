import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order, OrdersService } from '@sevenseven/orders';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ORDER_STATUS } from '../order.constants';

@Component({
  selector: 'admin-orders-list',
  templateUrl: './orders-list.component.html',
  styles: [
  ]
})
export class OrdersListComponent implements OnInit {
  orders: Order[] = [];
  
  orderStatus:any = ORDER_STATUS;
  
  constructor(private ordersService: OrdersService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
) { }

  ngOnInit(): void {
   this._getOrders();
  }

  private _getOrders(){
    this.ordersService.getOrders().subscribe((orders) => {
      this.orders = orders;
  })};

  deleteOrder(orderId: string) {
    this.confirmationService.confirm({
      message: 'Do you want to Delete this Order?',
      header: 'Delete Order',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.ordersService.deleteOrder(orderId).subscribe(
          () => {
            this._getOrders();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Order is deleted!'
            });
          },
          () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Order is not deleted!'
            });
          }
        );
      },
      reject: () => {
          this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
      }
    });
  }

  showOrder(orderId:any) {
    this.router.navigateByUrl(`orders/${orderId}`);
  }
}

