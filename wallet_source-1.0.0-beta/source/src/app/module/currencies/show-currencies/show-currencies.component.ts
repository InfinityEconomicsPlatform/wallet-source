import { Component, OnInit } from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {Subject} from 'rxjs/Subject';
import {Router} from '@angular/router';

@Component({
  selector: 'app-show-currencies',
  templateUrl: './show-currencies.component.html',
  styleUrls: ['./show-currencies.component.scss']
})
export class ShowCurrenciesComponent implements OnInit {
    routeChange = new Subject();
    constructor(private router: Router){
    }
    ngOnInit(){
    }
    onTabChange() {
        this.routeChange.next();
    }
}
