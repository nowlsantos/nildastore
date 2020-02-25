import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { ErrorService } from './error.service';

@Injectable({ providedIn: 'root' })
export class GlobalErrorService implements ErrorHandler {

    constructor(private injector: Injector) { }

    handleError(error) {
        // console.log('ErrorCode: ', error.code);
        const errorService = this.injector.get(ErrorService);
        errorService.setError(error);
    }
}
