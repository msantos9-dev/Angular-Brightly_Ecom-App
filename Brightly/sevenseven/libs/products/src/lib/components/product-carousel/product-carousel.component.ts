import { Component, OnInit } from '@angular/core';
import { Product, ProductsService } from '@sevenseven/products';

@Component({
    selector: 'products-product-carousel',
    templateUrl: './product-carousel.component.html',
    styles: []
})
export class ProductCarouselComponent implements OnInit {
    products: Product[] = [];
    responsiveOptions;

    constructor(private prodService: ProductsService) {
        this.responsiveOptions = [
            {
                breakpoint: '1024px',
                numVisible: 3,
                numScroll: 3
            },
            {
                breakpoint: '768px',
                numVisible: 2,
                numScroll: 2
            },
            {
                breakpoint: '560px',
                numVisible: 1,
                numScroll: 1
            }
        ];
    }

    ngOnInit(): void {
        this._getProducts();
    }

    private _getProducts(categoriesFilter?: string[]) {
        this.prodService.getProducts(categoriesFilter).subscribe((resProducts) => {
            this.products = resProducts;
        });
    }
}
