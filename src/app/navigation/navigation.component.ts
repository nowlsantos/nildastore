import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {

    @Output() opened = new EventEmitter<boolean>();

    open(flag: boolean) {
        this.opened.emit(flag);
    }
}
