import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { map, share, tap, filter } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import {
    Router, RouterEvent,
    RouteConfigLoadStart, RouteConfigLoadEnd,
    NavigationStart, NavigationEnd, NavigationCancel, NavigationError, RouterOutlet
} from '@angular/router';
import { MatSidenav, MatSidenavContainer } from '@angular/material/sidenav';
import { ViewPort } from './services/viewport.model';
import { ViewPortService } from './services/viewport.service';
import { routeAnimation } from './app.animation';
import { AngularFireAuth } from '@angular/fire/auth/auth';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    animations: [routeAnimation]
})
export class AppComponent implements OnInit {
    @ViewChild(MatSidenavContainer, { static: false }) sidenavContainer: MatSidenavContainer;
    @ViewChild('sidenav', { static: false }) sidenav: MatSidenav;

    private viewPort = new ViewPort();
    isLoading = false;
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
            // tap(value => console.log(value)),
            map(result => result.matches),
            share()
        );

    constructor(
        private breakpointObserver: BreakpointObserver,
        private viewportService: ViewPortService,
        private router: Router) {
    }

    ngOnInit() {
        this.routerEvents();
        this.onLayoutChange();
    }

    private routerEvents() {
        this.router.events.pipe(filter(event => event instanceof RouterEvent))
            .subscribe((event: RouterEvent) => {
                switch (true) {
                    case event instanceof RouteConfigLoadStart:
                    case event instanceof NavigationStart:
                        this.isLoading = true;
                        break;

                    case event instanceof RouteConfigLoadEnd:
                    case event instanceof NavigationEnd:
                    case event instanceof NavigationError:
                    case event instanceof NavigationCancel:
                    default:
                        this.isLoading = false;
                        break;
                }
            });
    }

    getState(outlet: RouterOutlet) {
        return outlet && outlet.activatedRouteData && outlet.activatedRouteData.state;
    }

    private onLayoutChange() {
        this.layoutChange$.subscribe(value => {
            switch (value) {
                case this.breakpointObserver.isMatched('(max-width: 599.99px) and (orientation: portrait)'):
                    this.viewPort.device = 'mobile';
                    this.viewPort.orientation = 'portrait';
                    this.isHandset = true;
                    break;

                // case this.breakpointObserver.isMatched('(max-width: 599.99px) and (orientation: landscape)'):
                //     this.viewPort.device = 'mobile';
                //     this.viewPort.orientation = 'landscape';
                //     this.isHandset = true;
                //     break;

                case this.breakpointObserver.isMatched('(min-width: 600px) and (max-width: 839.99px) and (orientation: portrait)'):
                    this.viewPort.device = 'tablet';
                    this.viewPort.orientation = 'portrait';
                    this.isHandset = false;
                    break;

                // case this.breakpointObserver.isMatched('(max-width: 959.99px) and (orientation: landscape)'):
                case this.breakpointObserver.isMatched('(min-width: 600px) and (max-width: 959.99px) and (orientation: landscape)'):
                    this.viewPort.device = 'tablet';
                    this.viewPort.orientation = 'landscape';
                    this.isHandset = true;
                    break;

                case this.breakpointObserver.isMatched('(min-width: 960px) and (max-width: 1279.99px) and (orientation: landscape)'):
                case this.breakpointObserver.isMatched('(min-width: 1280px) and (orientation: landscape)'):
                default:
                    this.viewPort.device = 'web';
                    this.viewPort.orientation = 'landscape';
                    this.isHandset = false;
                    break;
            }
            console.log(this.viewPort);
            this.viewportService.broadcastLayout(this.viewPort);
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
}
