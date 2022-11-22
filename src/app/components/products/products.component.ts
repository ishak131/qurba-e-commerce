import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { setProducts, setProductsFromGetByCategory } from 'src/app/NgRx/actions/products.actions';
import { AppState } from 'src/app/NgRx/selectors';
import { productResponseSelector, totalProductsSelector } from 'src/app/NgRx/selectors/productResponse.selector';
import { ProductsService } from 'src/app/services/products.service';
import { Product, ProductResponse } from 'src/app/types/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent implements OnInit {

  products$: Observable<Product[]>;
  total$: Observable<number>;

  searchKeyWord$: string = ""

  limit$: number = 9;
  skip$: number = 0;
  pages$: number[] = [];
  selectedPage$: number = 0;
  isAllProducts$: boolean = false;
  categories$: string[] = [];
  seletedCategories$: string[] = []

  constructor(private productsService: ProductsService, private store: Store<AppState>, private activatedRoute: ActivatedRoute) {
    this.products$ = this.store.pipe(select(productResponseSelector));
    this.total$ = this.store.pipe(select(totalProductsSelector));
    this.activatedRoute.queryParams.subscribe(params => {
      this.searchKeyWord$ = params['search'];
    });
  }

  addCategory(category$: string): void {
    let seletedCategories = this.seletedCategories$
    seletedCategories.push(category$)
    this.seletedCategories$ = [...seletedCategories]
  }

  removeCategory(category$: string): void {
    (this.seletedCategories$ = [...this.seletedCategories$.filter(category => category !== category$)])
  }

  onCheckBoxChange(event: Event): void {
    this.searchKeyWord$ = ""
    const target = event.target as HTMLInputElement;
    target.checked ? this.addCategory(target.id) : this.removeCategory(target.id)
    this.seletedCategories$.length ? this.getProductsByCategory() : this.getAllProducts()
  }

  getProductsByCategory(): void {
    this.isAllProducts$ = false;
    this.seletedCategories$.map((category) => {
      this.store.dispatch(setProducts({ products: [] }));
      this.productsService.getProductsByCategory(category).subscribe(({ products }: ProductResponse) => {
        this.store.dispatch(setProductsFromGetByCategory({ products }));
      })
    })
  }


  getAllProducts(): void {
    this.isAllProducts$ = true;
    this.skip$ = (this.selectedPage$ * this.limit$);
    this.productsService.getProductsAllProducts(this.limit$, this.skip$).subscribe(({ products, total }: ProductResponse) => {
      this.store.dispatch(setProducts({ products }));
      let pages = Math.floor(total / this.limit$)
      if (total % this.limit$)
        pages += 1
      this.pages$ = Array(pages).fill(0)
    })
  }

  changePage(pageIndex: number): void {
    this.selectedPage$ = pageIndex;
    this.getAllProducts()
  }

  nextPage(): void {
    if (this.selectedPage$ < (this.pages$.length - 1)) {
      this.selectedPage$ += 1
      this.getAllProducts()
    }
  }

  prevPage(): void {
    if (this.selectedPage$ > 0) {
      this.selectedPage$ -= 1
      this.getAllProducts()
    }
  }

  isLongPagination(pageIndex: number): boolean {
    if (pageIndex === this.selectedPage$)
      return false
    if (pageIndex === 0) {
      return false
    }
    if (pageIndex === this.pages$.length - 1) {
      return false
    }
    if (this.selectedPage$ === pageIndex - 1 || this.selectedPage$ === pageIndex + 1) {
      return false
    }
    return true
  }


  isDotedButton(pageIndex: number): boolean {
    if (pageIndex === 0)
      return false
    if (pageIndex === this.pages$.length - 1)
      return false
    if (this.selectedPage$ === pageIndex - 2 || this.selectedPage$ === pageIndex + 2) {
      return true
    }
    return false
  }



  ngOnInit(): void {
    this.getAllProducts();
    this.productsService.getCategories().subscribe(categories => {
      this.categories$ = categories
    })
  }




}
