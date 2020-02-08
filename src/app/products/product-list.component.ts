import { Component, OnInit } from '@angular/core';
import { ProductService } from './services/product.service';
import { Observable } from 'rxjs';
import { Product } from './models/product';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

    products$: Observable<Product[]>;

    constructor(private productService: ProductService) { }

    ngOnInit() {
        this.products$ = this.productService.getProducts();
        // this.products$.subscribe(value => console.log(value));
    }
}
