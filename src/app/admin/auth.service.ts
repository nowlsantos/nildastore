import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { User } from './user.model';
import { switchMap } from 'rxjs/operators';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

@Injectable({ providedIn: 'root' })
export class AuthService {

    user$: Observable<User>;

    constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore, private router: Router, private ngZone: NgZone) {
        this.user$ = this.afAuth.authState.pipe(
            switchMap(user => {
                return user ? this.afs.doc<User>(`users/${user.uid}`).valueChanges()
                    : of(null);
            })
        );
    }

    async emailSignUp(email: string, password: string) {
        return await this.afAuth.createUserWithEmailAndPassword(email, password)
            .then(result => {
                this.sendVerificationSignUp();
                this.updateUserData(result.user);
            }).catch(error => console.log(error.message));
    }

    async sendVerificationSignUp() {
        return (await this.afAuth.currentUser).sendEmailVerification()
            .then(() => this.router.navigate(['/register']));
    }

    async emailSignIn(email: string, password: string) {
        return await this.afAuth.signInWithEmailAndPassword(email, password)
            .then(result => {
                this.ngZone.run(() => {
                    this.router.navigate(['/home']);
                });
                this.updateUserData(result.user);
            }).catch(error => console.log(error.message));
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

    private updateUserData({ uid, displayName, email }: User) {
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
