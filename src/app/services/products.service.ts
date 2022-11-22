import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductResponse } from '../types/product';

@Injectable({
  providedIn: 'root'
})

export class ProductsService {

  private getAllProductsEndPoint = "/products";
  private getAllCategoriesEndPoint = "/products/categories";
  private getProductsByCategoryEndPoint = "/products/category";
  private getProductsBySearchEndPoint = "/products/search?q=";

  constructor(private http: HttpClient) { }

  getAllProducts(skip: number = 0): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(environment.apisURL + this.getAllProductsEndPoint + `?limit=${9}&skip=${skip}`)
  }

  getProductsByCategory(category: string = ""): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(environment.apisURL + this.getProductsByCategoryEndPoint + `/${category}`)
  }

  getProductsBySearch(keyword: string = ""): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(environment.apisURL + this.getProductsBySearchEndPoint + keyword)
  }

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(environment.apisURL + this.getAllCategoriesEndPoint)
  }

}
