import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    registerForm: FormGroup;
    hide = true;

    constructor(
        public authService: AuthService,
        private fb: FormBuilder) { }

    ngOnInit() {
        this.registerForm = this.fb.group({
            username: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
            email: ['', [Validators.email, Validators.required]],
            /* password: ['', [Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'), */
            password: ['', [Validators.minLength(6),
            Validators.maxLength(25),
            Validators.required]]
        });
    }

    get username() {
        return this.registerForm.get('username');
    }

    get email() {
        return this.registerForm.get('email');
    }

    get password() {
        return this.registerForm.get('password');
    }

    getUsernameErrorMessage() {
        return this.username.hasError('required') ? 'You must enter a username' :
            this.username.hasError('username') ? 'Not a valid username' : '';
    }

    getEmailErrorMessage() {
        return this.email.hasError('required') ? 'You must enter an email' :
            this.email.hasError('email') ? 'Not a valid email' : '';
    }

    getPasswordErrorMessage() {
        return this.password.hasError('required') ? 'You must enter a password' : '';
    }

    onSignUp() {
        this.authService.emailSignUp(this.email.value, this.password.value);
    }
}
