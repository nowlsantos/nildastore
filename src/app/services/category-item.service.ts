import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoryItem } from './category.model';

@Injectable({
    providedIn: 'root'
})
export class CategoryItemService {
    constructor(private http: HttpClient) { }

    getCategories(): Observable<CategoryItem[]> {
        return this.http.get<CategoryItem[]>('../../assets/category.json');
    }
}
