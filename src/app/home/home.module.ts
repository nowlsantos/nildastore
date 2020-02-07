import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { HomeComponent } from './home.component';
import { HeaderComponent } from './header/header.component';
import { CategoryComponent } from './category/category.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: '', component: HomeComponent }
]

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
