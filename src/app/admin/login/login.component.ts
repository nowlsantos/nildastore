import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { LoginService } from '../login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
            password: ['', [Validators.required, Validators.minLength(4)]]
        });
    }

    getEmailErrorMessage() {
        const email = this.loginForm.get('email');
        return email.hasError('required') ? 'You must enter a value' :
            email.hasError('email') ? 'Not a valid email' : '';
    }

    getPasswordErrorMessage() {
        const password = this.loginForm.get('password');
        return password.hasError('required') ? 'You must enter a password' : '';
    }

    onLogin() {
        console.log(this.loginForm.value);
    }

    /* facebookLogin() {
        this.authService.facebookSignIn();
    }

    googleLogin() {
        this.authService.googleSignIn();
        this.loginService.broadcastLogin(true);
    } */

    onLogout() {
        this.authService.signOut();
        this.loginService.broadcastLogin(false);
    }
}
