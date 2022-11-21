import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/types/product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  @Input() product!: Product
  reviewsNumber: number = 11
  starWidth: number = 0
  priceAfterDiscount: string = ""

  constructor() { }

  ngOnInit(): void {
    // here I am calculating the width of the yellow star 
    // becuase it is width is depending on the rating 
    let maxStarWidth = 17;
    let maxRatingValue = 5;
    let starWidth = (this.product.rating / maxRatingValue) * maxStarWidth;
    this.starWidth = starWidth
    // calculating price after discount ;
    this.priceAfterDiscount = (this.product.price - (this.product.price * (this.product.discountPercentage / 100))).toFixed(2)

  }
}
