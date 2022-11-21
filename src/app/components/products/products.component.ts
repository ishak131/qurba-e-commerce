import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Product, ProductResponse } from 'src/app/types/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent implements OnInit {

  products$: Product[] = [];

  limit$: number = 0;
  skip$: number = 0;
  total$: number = 0;

  categories$: string[] = [];
  seletedCategories$: string[] = []

  addCategory(category$: string) {
    let seletedCategories = this.seletedCategories$
    seletedCategories.push(category$)
    this.seletedCategories$ = [...seletedCategories]
  }

  removeCategory(category$: string) {
   
   (this.seletedCategories$ = [...this.seletedCategories$.filter(category => category !== category$)])
  }

  onCheckBoxChange(event: Event) {
    const target = event.target as HTMLInputElement;
    target.checked ? this.addCategory(target.id) : this.removeCategory(target.id)
    this.seletedCategories$.length ? this.getProductsByCategory() : this.getAllProducts()
    console.log(this.seletedCategories$);

  }

  getProductsByCategory() {
    this.seletedCategories$.map((category) => {
      this.products$ = []
      this.limit$ = 0;
      this.total$ = 0;
      this.skip$ = 0;
      return this.productsService.getProductsByCategory(category).subscribe(({ products, limit, total, skip }: ProductResponse) => {
        let products$ = this.products$;
        this.products$ = [...products$, ...products]
        this.limit$ += limit;
        this.total$ += total;
        this.skip$ += skip;
      })
    })
  }


  getAllProducts() {
    this.productsService.getProductsAllProducts().subscribe((data: ProductResponse) => {
      this.products$ = data.products;
    })
  }

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.getAllProducts();

    this.productsService.getCategories().subscribe(categories => {
      this.categories$ = categories
    })
  }




}
