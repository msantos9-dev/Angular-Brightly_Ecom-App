import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category';
import { environment } from '@env/environment';

@Injectable({
    providedIn: 'root'
})
export class CategoriesService {

   categoriesAPI = environment.apiURL + 'categories';

    constructor(private http: HttpClient) {}

    getCategories(): Observable<Category[]> {
        return this.http.get<Category[]>(this.categoriesAPI);
    }

    getCategory(categoryId: string): Observable<Category> {
      return this.http.get<Category>(`${this.categoriesAPI}/${categoryId}`);
  }

    createCategory(category: Category): Observable<Category> {
        return this.http.post<Category>(this.categoriesAPI, category);
    }

    deleteCategory(categoryId: string): Observable<Category>{
      return this.http.delete<Category>(`${this.categoriesAPI}/${categoryId}`);
    }

    updateCategory(category: Category): Observable<Category> {
      return this.http.put<Category>(`${this.categoriesAPI}/${category.id}`, category);
  }
}
