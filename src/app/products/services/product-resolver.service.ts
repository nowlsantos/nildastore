import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Product } from '../models/product';
import { Observable } from 'rxjs';
import { ProductService } from './product.service';
import { first } from 'rxjs/operators';

@Injectable()
export class ProductResolver implements Resolve<Product> {

    constructor(private productService: ProductService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product> {
        const id = route.paramMap.get('id');
        return this.productService.getProduct(id).pipe(first());
    }
}
