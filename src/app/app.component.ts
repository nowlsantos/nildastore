import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ProductService } from './product/service/product.service';
import { Product } from './product/model/product.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'NildaStore';
  product$: Observable<Product[]>;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.product$ = this.productService.getProducts();
  }
}
