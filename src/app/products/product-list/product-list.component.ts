import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { ViewPortService } from '../../services/viewport.service';
import { ViewPort } from '../../services/viewport.model';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/admin/login.service';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

    products$: Observable<Product[]>;
    viewport: ViewPort;
    isLoggedIn = false;

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

        this.route.queryParamMap.subscribe(params => {
            const category = params.get('category');
            this.products$ = this.productService.filterBy(category);
        });
    }
}
