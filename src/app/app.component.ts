import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductService } from './product/service/product.service';
import { ProductId, Product } from './product/model/product.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'NildaStore';
  product$: Observable<ProductId[]>;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.product$ = this.productService.getProducts();
  }

  getProductById(product) {
    return this.productService.getProduct(product);
  }
}
