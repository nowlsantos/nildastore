import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService } from '../../services/menu.service';
import { Observable } from 'rxjs';
import { Menu } from 'src/app/services/menu.model';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css'],
    providers: [ MenuService ]
})
export class MenuComponent implements OnInit {

    cakes: Menu[];
    pastries: Menu[];

    constructor(private menuService: MenuService,
                private router: Router) { }

    ngOnInit() {
        this.menuService.getMenus().subscribe(menu => {
            console.log(menu);
            /* tslint:disable:no-string-literal */
            this.cakes = menu['cake'];
            this.pastries = menu['pastries'];
        });
    }

    viewProductBy(category: string) {
        this.router.navigate(['/products'], {
            queryParams: { category }
        });
    }

    adminLogin() {
        this.router.navigate(['/login']);
    }
}
