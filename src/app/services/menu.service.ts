import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Menu } from './menu.model';

@Injectable({
    providedIn: 'root'
})
export class MenuService {
    constructor(private http: HttpClient) { }

    getMenus(): Observable<Menu[]> {
        return this.http.get<Menu[]>('../../assets/menu.json');
    }
}
