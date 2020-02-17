import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Product } from '../models/product';
import { ViewPortService } from '../../services/viewport.service';
import { ViewPort } from '../../services/viewport.model';
import { ActivatedRoute, Router } from '@angular/router';
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
    showFab = false;
    isLoading = true;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private productService: ProductService,
                private viewportService: ViewPortService,
                private loginService: LoginService) { }

    ngOnInit() {
        this.viewportService.viewportLayout$.subscribe(viewport => {
            this.viewport = viewport;
        });

        this.loginService.loggedIn$.subscribe(isLoggedIn => {
            this.isLoggedIn = isLoggedIn;
        });

        this.route.queryParamMap.subscribe(params => {
            const category = params.get('category');

            if ( category ) {
                return this.products$ = this.productService.getProducts().pipe(
                    map(products => products.filter(product => product.category === category)),
                    tap( (products) => {
                        this.isLoading = false;
                        this.showFab = true;
                        products.forEach(product => {
                            console.log('Date: ', product.date);
                        });
                    })
                );
            }
            return this.products$ = this.productService.getProducts();
        });
    }

    trackByFn(index: number, item: Product) {
        return index;
    }

    navigateToHome(event) {
        this.showFab = false;
        this.router.navigate(['/home']);
    }
}
