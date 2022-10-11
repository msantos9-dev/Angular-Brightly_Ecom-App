import { Component, OnInit } from '@angular/core';
import { ProductsService } from '@sevenseven/products';

@Component({
    selector: 'brightly-home-page',
    templateUrl: './home-page.component.html',
})
export class HomePageComponent implements OnInit {
    
    
    constructor(private prodService: ProductsService) {
       
    }

    ngOnInit(): void {
       
    }

   
}
