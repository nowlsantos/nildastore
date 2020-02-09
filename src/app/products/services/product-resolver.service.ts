import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Product } from '../models/product';
import { Observable, of } from 'rxjs';
import { ProductService } from './product.service';
import { first, catchError } from 'rxjs/operators';

@Injectable()
export class ProductResolver implements Resolve<Product> {

    constructor(private productService: ProductService,
                private router: Router) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product> {
        const id = route.paramMap.get('id');
        return this.productService.getProduct(id).pipe(
            first(),
            catchError( error => {
                console.log('Retrieval Error: ', `${error}`);
                this.router.navigate(['/products']);
                return of(null);
            })
        );
    }
}