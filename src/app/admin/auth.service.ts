import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { User } from './user.model';
import { switchMap } from 'rxjs/operators';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

@Injectable( {providedIn: 'root' })
export class AuthService {

    user$: Observable<User>;

    constructor(private afAuth: AngularFireAuth,
                private afs: AngularFirestore,
                private router: Router) {
        this.user$ = this.afAuth.authState.pipe(
            switchMap( user => {
                if ( user ) {
                    return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
                } else {
                    return of(null);
                }
            })
        );
    }

    async googleSignIn() {
        const provider = new firebase.auth.GoogleAuthProvider();
        const credential = await this.afAuth.signInWithPopup(provider);
        return this.updateUserData(credential.user);
    }

    async facebookSignIn() {
        const provider = new firebase.auth.FacebookAuthProvider();
        const credential = await this.afAuth.signInWithPopup(provider);
        return this.updateUserData(credential.user);
    }

    async signOut() {
        await this.afAuth.signOut();
        this.router.navigate(['/']);
    }

    private updateUserData({ uid, displayName, email}: User) {
        // ---sets user data on firestore on login  ---
        const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${uid}`);

        const data = {
            uid,
            displayName,
            email
        };
        // console.log('UpdateUserData: ', data);
        return userRef.set(data, { merge: true });
    }
}
