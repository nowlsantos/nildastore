import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { LoginService } from '../login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../user.model';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    hide = true;

    constructor(
        public authService: AuthService,
        private loginService: LoginService,
        private fb: FormBuilder) { }

    ngOnInit() {
        this.loginForm = this.fb.group({
            email: ['', [Validators.email, Validators.required]],
            // password: ['', [Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
            password: ['', [Validators.minLength(6), Validators.maxLength(25), Validators.required]]
        });

        this.authService.user$.subscribe(user => {
            if (user) {
                console.log('User onInit: ', user);
                this.loginService.broadcastLogin(user.isAdmin);
            }
        });
    }

    get email() {
        return this.loginForm.get('email');
    }

    get password() {
        return this.loginForm.get('password');
    }

    getEmailErrorMessage() {
        return this.email.hasError('required') ? 'You must enter a value' :
            this.email.hasError('email') ? 'Not a valid email' : '';
    }

    getPasswordErrorMessage() {
        return this.password.hasError('required') ? 'You must enter a password' : '';
    }

    onLogin() {
        this.authService.emailSignIn(this.email.value, this.password.value);
    }

    facebookLogin() {
        this.authService.facebookSignIn();
    }

    googleLogin() {
        this.authService.googleSignIn();
        this.loginService.broadcastLogin(true);
    }

    onLogout() {
        this.authService.signOut();
        this.loginService.broadcastLogin(false);
    }
}
