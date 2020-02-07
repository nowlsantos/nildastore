import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { map, share, tap } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver} from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    @ViewChild('sidenav', { static: false}) sidenav: MatSidenav;

    isHandset = false;

    layoutChange$: Observable<boolean> = this.breakpointObserver.observe(
        [
            Breakpoints.Handset,
            Breakpoints.Tablet,
            Breakpoints.HandsetPortrait, Breakpoints.HandsetLandscape,
            Breakpoints.TabletPortrait, Breakpoints.WebLandscape,
            Breakpoints.Web
        ])
        .pipe(
            tap(value => console.log(value)),
            map(result => result.matches),
            share()
        );

    constructor(private breakpointObserver: BreakpointObserver,
                private router: Router) {}

    ngOnInit() {
        this.onLayoutChange();
    }

    private onLayoutChange() {
        this.layoutChange$.subscribe(value => {
            switch ( value ) {
                case this.breakpointObserver.isMatched('(max-width: 599.99px) and (orientation: portrait)'):
                    console.log('Handset Portrait');
                    this.isHandset = true;
                    break;

                /* case this.breakpointObserver.isMatched('(max-width: 959.99px) and (orientation: landscape)'):
                    console.log('Handset Landscape');
                    this.isHandset = false;
                    break; */

                case this.breakpointObserver.isMatched('(min-width: 600px) and (max-width: 839.99px) and (orientation: portrait)'):
                    console.log('Tablet Portrait');
                    this.isHandset = false;
                    break;

                case this.breakpointObserver.isMatched('(max-width: 959.99px) and (orientation: landscape)'):
                case this.breakpointObserver.isMatched('(min-width: 600px) and (max-width: 959.99px) and (orientation: landscape)'):
                    console.log('Tablet Landscape');
                    this.isHandset = false;
                    break;

                case this.breakpointObserver.isMatched('(min-width: 960px) and (max-width: 1279.99px) and (orientation: landscape)'):
                case this.breakpointObserver.isMatched('(min-width: 1280px) and (orientation: landscape)'):
                    console.log('Tablet Landscape | Web landscape');
                    this.isHandset = false;
                    break;
            }
        });
    }

    openSideNav() {
        this.sidenav.open();
    }

    closeSideNav() {
        this.sidenav.close();
    }

    createContact() {
        this.router.navigate(['/new']);
    }

    logout() {
        // this.authService.logout();
        this.router.navigate(['/login']);
    }
}
