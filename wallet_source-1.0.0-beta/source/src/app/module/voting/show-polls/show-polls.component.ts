import { Component, OnInit } from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'app-show-polls',
  templateUrl: './show-polls.component.html',
  styleUrls: ['./show-polls.component.scss']
})
export class ShowPollsComponent implements OnInit {

    routeChange = new Subject();
    constructor(){
    }
    ngOnInit(){
    }
    onTabChange() {
        this.routeChange.next();
    }

}