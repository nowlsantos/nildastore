import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable( { providedIn: 'root' } )
export class PreloadingStrategyService implements PreloadingStrategy {

    preload(route: Route, fn: () => Observable<any>): Observable<any> {
        /* tslint:disable:no-string-literal */
        if ( route.data && route.data['preload']) {
            return fn();
        } else {
            return of(null);
        }
    }
}
