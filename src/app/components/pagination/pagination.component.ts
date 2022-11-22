import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/NgRx/selectors';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input() paginationPages: number[] = [];
  searchKeyWord: string = ""
  @Input() getAllProducts: () => void = () => { }
  selectedPage: number = 0;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private productsService: ProductsService, private store: Store<AppState>) {
    this.activatedRoute.queryParams.subscribe(params => {
      let selectedPageURLParameter = parseInt(params['selectedPage'])
      this.searchKeyWord = params['search']
      if (!this.searchKeyWord)
        isNaN(selectedPageURLParameter) ? this.replaceQueryParamsAndRunGetAllProducts() : this.selectedPage = selectedPageURLParameter;
    });
  }


  replaceQueryParamsAndRunGetAllProducts() {
    this.router.navigate(["products"], {
      queryParams: { selectedPage: this.selectedPage },
    })
    this && this.getAllProducts()
  }

  changePage(pageIndex: number): void {
    this.selectedPage = pageIndex;
    this.replaceQueryParamsAndRunGetAllProducts()
  }

  nextPage(): void {
    if (this.selectedPage < (this.paginationPages.length - 1)) {
      this.selectedPage += 1
      this.replaceQueryParamsAndRunGetAllProducts()
    }
  }

  prevPage(): void {
    if (this.selectedPage > 0) {
      this.selectedPage -= 1
      this.replaceQueryParamsAndRunGetAllProducts()
    }
  }

  isLongPagination(pageIndex: number): boolean {
    if (pageIndex === this.selectedPage)
      return false
    if (pageIndex === 0) {
      return false
    }
    if (pageIndex === this.paginationPages.length - 1) {
      return false
    }
    if (this.selectedPage === pageIndex - 1 || this.selectedPage === pageIndex + 1) {
      return false
    }
    return true
  }

  isDotedButton(pageIndex: number): boolean {
    if (pageIndex === 0)
      return false
    if (pageIndex === this.paginationPages.length - 1)
      return false
    if (this.selectedPage === pageIndex - 2 || this.selectedPage === pageIndex + 2) {
      return true
    }
    return false
  }

  ngOnInit(): void {

  }

}
