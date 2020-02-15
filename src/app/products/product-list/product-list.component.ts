import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Observable, of } from 'rxjs';
import { map, finalize } from 'rxjs/operators';
import { Product } from '../models/product';
import { ViewPortService } from '../../services/viewport.service';
import { ViewPort } from '../../services/viewport.model';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/admin/login.service';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: [ './product-list.component.css' ]
})
export class ProductListComponent implements OnInit {

    products$: Observable<Product[]>;
    products: Product[];
    viewport: ViewPort;
    isLoggedIn = false;
    showSpinner = false;

    constructor(private route: ActivatedRoute,
                private productService: ProductService,
                private viewportService: ViewPortService,
                private loginService: LoginService) { }

    ngOnInit() {
        this.viewportService.viewportLayout$.subscribe(viewport => {
            // console.log('ProdList: ', viewport);
            this.viewport = viewport;
        });

        this.loginService.loggedIn$.subscribe(isLoggedIn => {
            this.isLoggedIn = isLoggedIn;
        });

        this.showSpinner = true;
        console.log('Spinner 1: ', this.showSpinner);
        this.route.data.pipe(
            map(data => of(data.products))
        ).subscribe(data => {
            this.products$ = data;
            this.showSpinner = false;
        });

        console.log('Spinner 2: ', this.showSpinner);
        /* this.route.queryParamMap.subscribe(params => {
            const category = params.get('category');

            if ( category ) {
                return this.products$ = this.productService.getProducts().pipe(
                    map(products => products.filter(product => product.category === category))
                );
            }

            return this.products$ = this.productService.getProducts();
        }); */
    }
}
