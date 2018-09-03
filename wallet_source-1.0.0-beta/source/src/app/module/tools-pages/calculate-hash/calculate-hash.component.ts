import { Component, OnInit } from '@angular/core';
import { ToolsService } from '../tools.service';
import * as alertFunctions from "../../../shared/data/sweet-alerts";

@Component({
  selector: 'app-calculate-hash',
  templateUrl: './calculate-hash.component.html',
  styleUrls: ['./calculate-hash.component.scss']
})
export class CalculateHashComponent implements OnInit {

  calculateHashForm: any = {
    input: '',
    output: '',
    algo: 2
  }
  constructor(public toolsService: ToolsService) { }

  ngOnInit() {
  }

  calculateHash() {
    this.calculateHashForm.output = "";
    this.toolsService.calculateHash(this.calculateHashForm.algo, this.calculateHashForm.input).subscribe((success) => {
      if (!success.errorCode) {

        this.calculateHashForm.output = success.hash;

      } else {
        alertFunctions.InfoAlertBox('Error',
          'Sorry, an error occured! Reason: ' + success.errorDescription,
          'OK',
          'error').then((isConfirm: any) => {

          });
      }
    }, function (error) {
      alertFunctions.InfoAlertBox('Error',
        'Sorry, an error occured! Reason: ' + error.errorDescription,
        'OK',
        'error').then((isConfirm: any) => {

        });
    });

  };

}
