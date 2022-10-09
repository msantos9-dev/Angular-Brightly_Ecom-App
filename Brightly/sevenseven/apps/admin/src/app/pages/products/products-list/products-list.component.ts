import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product, ProductsService } from '@sevenseven/products';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'admin-products-list',
  templateUrl: './products-list.component.html',
  styles: [
  ]
})
export class ProductsListComponent implements OnInit {

  products: Product[] = [];

  constructor(private productService:ProductsService, private router: Router, private messageService:MessageService, private confirmationService: ConfirmationService,) { }

  ngOnInit(): void {
    this._getProducts();
  }

  deleteProduct(productId: string){
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this category?',
      header: 'Delete Category',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.productService.deleteProduct(productId).subscribe(
              () => {
                  this._getProducts();
                  this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product deleted successfully' });
              },
              () => {
                  this.messageService.add({ severity: 'error', summary: 'Failed', detail: 'Product deletion failed' });
              }
          );
      },
      reject: () => {
          this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
      }
  });
  }

  updateProduct(productId: string){
    this.router.navigateByUrl(`products/form/${productId}`);
  }

  private _getProducts(){
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
  });
  }
}
