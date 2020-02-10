import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from 'src/app/products/models/product';

@Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

    products$: Observable<Product[]>;

    constructor(private router: Router) { }

    ngOnInit() {
    }

    viewProductsBy(category: string) {
        this.router.navigate(['/products'], {
            queryParams: { category }
        });
    }
}
