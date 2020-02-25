import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import * as firebase from 'firebase';

@Injectable({
    providedIn: 'root'
})
export class ErrorService {

    private messageSubject = new BehaviorSubject<firebase.FirebaseError>(undefined);
    message$ = this.messageSubject.asObservable();

    setError(error: firebase.FirebaseError) {
        this.messageSubject.next(error);
    }
}
