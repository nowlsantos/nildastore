import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import { ViewPortService } from 'src/app/services/viewport.service';

@Component({
    selector: 'app-product-detail',
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
    product: Product;

    constructor(private router: Router,
                private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.data.subscribe(data => {
            /* tslint:disable:no-string-literal */
            this.product = data['product'] as Product;
        });
    }

    gotoProducts() {
        this.router.navigate(['/products']);
    }
}
