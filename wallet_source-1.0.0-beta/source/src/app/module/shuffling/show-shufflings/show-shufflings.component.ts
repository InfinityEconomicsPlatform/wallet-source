import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
@Component({
    selector: 'app-show-shufflings',
    templateUrl: './show-shufflings.component.html',
    styleUrls: ['./show-shufflings.component.scss']
  })
  export class ShowShufflingsComponent implements OnInit {

    constructor(private router: Router) {
    }

    ngOnInit() {
    }

    navigateTo(route){
      this.router.navigate([route]);
    }
}
