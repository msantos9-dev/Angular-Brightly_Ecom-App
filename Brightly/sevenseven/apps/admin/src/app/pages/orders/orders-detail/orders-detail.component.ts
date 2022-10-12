import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order, OrdersService } from '@sevenseven/orders';
import * as console from 'console';
import { MessageService } from 'primeng/api';
import { parse } from 'querystring';
import { findIndex } from 'rxjs';
import { ORDER_STATUS } from '../order.constants';

@Component({
  selector: 'admin-orders-detail',
  templateUrl: './orders-detail.component.html',
  styles: [
  ]
})
export class OrdersDetailComponent implements OnInit {
  order?: Order | any;
  orderStatuses:any = [];
  selectedStatus: any;
  
  constructor(  private orderService: OrdersService,
    private messageService: MessageService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this._mapOrderStatus();
    this._getOrder();
  }

  private _mapOrderStatus() {
    this.orderStatuses = Object.entries(ORDER_STATUS).map((key) => {
      return {
        id: key[0],  
        name: key[1].label
      };
    });
  }
  

  private _getOrder() {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.orderService.getOrder(params['id']).subscribe((order) => {
          this.order = order;
          this.selectedStatus = order.status;
        });
      }
    });
  }

  onStatusChange(event:any) {
    this.orderService.updateOrder({ status: event.value }, this.order?.id).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Order is updated!'
        });
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Order is not updated!'
        });
      }
    );
  }

}
