import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { setProductResponse } from 'src/app/NgRx/actions/products.actions';
import { AppState } from 'src/app/NgRx/selectors';
import { productResponseSelector } from 'src/app/NgRx/selectors/productResponse.selector';
import { ProductsService } from 'src/app/services/products.service';
import { Product, ProductResponse } from 'src/app/types/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent implements OnInit {

  productResponse$: Observable<ProductResponse>;
  products: Product[] = [];
  total: number = 10;
  limit: number = 9;
  skip: number = 0;
  selectedPage: number = 0;
  searchKeyWord: string = ""
  showSearchResultHeader: boolean = Boolean(this.searchKeyWord)
  paginationPages: number[] = []
  showPagination: boolean = !(this.total === this.limit)

  
  constructor(private productsService: ProductsService, private store: Store<AppState>, private activatedRoute: ActivatedRoute) {
    this.productResponse$ = this.store.pipe(select(productResponseSelector));
    this.activatedRoute.queryParams.subscribe(params => {
      this.searchKeyWord = params['search'];
      let selectedPageURLParameter = parseInt(params['selectedPage'])
      this.selectedPage = isNaN(selectedPageURLParameter) ? 0 : selectedPageURLParameter;
    });
  }

  calculatePagesNumberAndGeneratePaginationPagesArray() {
    let limitForAllProductsApi = 9
    let pages = Math.floor(this.total / limitForAllProductsApi)
    if (this.total % limitForAllProductsApi)
      pages += 1
    pages && (this.paginationPages = Array(pages).fill(0))    
  }

  getAllProducts() {
    let skip = this.selectedPage * 9;
    this.productsService.getAllProducts(skip).subscribe((productResponse: ProductResponse) => {
      this.store.dispatch(setProductResponse({ productResponse }));
    })
  }

  ngOnInit(): void {
    this.getAllProducts();
    this.productResponse$.subscribe(({ products, total, limit, skip }) => {
      this.products = products
      this.limit = limit
      this.total = total
      this.skip = skip
      this.showPagination = !(limit === total)
      this.calculatePagesNumberAndGeneratePaginationPagesArray()
    })
  }




}
