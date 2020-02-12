import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { LoginService } from '../login.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    constructor(public authService: AuthService,
                private loginService: LoginService) { }

    ngOnInit() {}

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
