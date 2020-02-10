import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Product } from '../models/product';
import { Observable, of } from 'rxjs';
import { ProductService } from './product.service';
import { first, catchError } from 'rxjs/operators';

@Injectable()
export class CategoryResolver implements Resolve<Product> {

    constructor(private productService: ProductService,
                private router: Router) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product> {
        /* tslint:disable:no-string-literal */
        const category = route.queryParamMap.get('category');
        console.log('CategoryService: ', category);

        /* if ( !category ) {
            console.log('Hello Nowl');
            return this.productService.getProduct(route.paramMap.get('id'))
                .pipe(first());
        } */

        return this.productService.filterBy(`${category}`).pipe(
            first(),
            catchError( error => {
                console.log('Retrieval Error: ', `${error}`);
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }
}