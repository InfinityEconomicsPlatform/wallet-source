import {Component, OnInit} from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Component({
    selector: 'app-send',
    templateUrl: './send.component.html',
    styleUrls: ['./send.component.scss']
})
export class SendComponent implements OnInit {
    routeChange = new Subject();
    constructor() {}

    ngOnInit() {

    }

    onTabChange() {
        this.routeChange.next();
    }
}
