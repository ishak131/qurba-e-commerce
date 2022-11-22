import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

  getProductsAllProducts(limit: number = 9, skip: number = 0) {
    return this.http.get<ProductResponse>(environment.apisURL + this.getAllProductsEndPoint + `?limit=${limit}&skip=${skip}`)
  }

  getProductsByCategory(category: string = "") {
    return this.http.get<ProductResponse>(environment.apisURL + this.getProductsByCategoryEndPoint + `/${category}`)
  }

  getProductsBySearch(keyword: string = "") {
    return this.http.get<ProductResponse>(environment.apisURL + this.getProductsBySearchEndPoint + keyword)
  }

  getCategories() {
    return this.http.get<string[]>(environment.apisURL + this.getAllCategoriesEndPoint)
  }

}
