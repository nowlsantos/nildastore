import { Component, OnInit } from '@angular/core';
import { ProductService } from './services/product.service';
import { Observable } from 'rxjs';
import { Product } from './models/product';
import { ViewPortService } from '../services/viewport.service';
import { ViewPort } from '../services/viewport.model';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

    products$: Observable<Product[]>;
    viewport: ViewPort;
    
    constructor(private route: ActivatedRoute,
                private productService: ProductService,
                private viewportService: ViewPortService) { }

    ngOnInit() {
        this.viewportService.viewportLayout$.subscribe(viewport => {
            // console.log('ProdList: ', viewport);
            this.viewport = viewport;
        });

        // this.route.data.subscribe(data => {
        //     // /* tslint:disable:no-string-literal */
        //     if ( data.products.length > 0 ) {
        //         this.products$ = data['products'] as Observable<Product[]>;
        //     }
        //     console.log('DATA: ', data.products);
        // });

        this.route.queryParamMap.subscribe(params => {
            const category = params.get('category');
            console.log(category);
            if ( category ) {
                this.products$ = this.productService.filterBy(category);
            } else {
                this.products$ = this.productService.getProducts();
            }
        });

        this.products$.subscribe(console.log);

    }
}
