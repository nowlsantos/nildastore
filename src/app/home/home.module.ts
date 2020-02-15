import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home.component';
import { HeaderComponent } from './header/header.component';
import { CategoryComponent } from './category/category.component';
import { FooterComponent } from './footer/footer.component';

const routes: Routes = [
    { path: '', component: HomeComponent, data: { state: 'home' } }
];

@NgModule({
    declarations: [
        HomeComponent,
        HeaderComponent,
        CategoryComponent,
        FooterComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ]
})
export class HomeModule { }
