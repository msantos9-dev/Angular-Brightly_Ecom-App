import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Product } from '../models/product';
import { environment } from '@env/environment';

@Injectable({
    providedIn: 'root'
})
export class ProductsService {

   productsAPI = environment.apiURL + 'products';

    constructor(private http: HttpClient) {}

    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(this.productsAPI);
    }

    getProduct(productId: string): Observable<Product> {
      return this.http.get<Product>(`${this.productsAPI}/${productId}`);
  }

    createProduct(productData: FormData): Observable<Product> {
        return this.http.post<Product>(this.productsAPI, productData);
    }

    deleteProduct(productId: string): Observable<Product>{
      return this.http.delete<Product>(`${this.productsAPI}/${productId}`);
    }

    updateProduct(productData: FormData, productId: string): Observable<Product> {
      return this.http.put<Product>(`${this.productsAPI}/${productId}`, productData);
  }
  getProductsCount(): Observable<number> {
    return this.http
      .get<number>(`${this.productsAPI}/get/count`)
      .pipe(map((objectValue: any) => objectValue.productCount));
  }
  getFeaturedProducts(count: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.productsAPI}/get/featured/${count}`);
  }


}
