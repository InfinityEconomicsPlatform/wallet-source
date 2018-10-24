import { Component, OnInit } from '@angular/core';
import { ToolsService } from '../tools.service';
import * as alertFunctions from "../../../shared/data/sweet-alerts";

@Component({
  selector: 'app-chain-statistics',
  templateUrl: './chain-statistics.component.html',
  styleUrls: ['./chain-statistics.component.scss']
})
export class ChainStatisticsComponent implements OnInit {

  constructor(public toolsService: ToolsService) { }

  chainStatistics: any = {};
  ngOnInit() {
    this.getChainStats();
  }

  getChainStats() {

    this.toolsService.getChainStats().subscribe((success) => {
      if (!success.errorCode) {

        this.chainStatistics = success;

      } else {
        alertFunctions.InfoAlertBox('Error',
          'Sorry, an error occured! Reason: ' + success.errorDescription,
          'OK',
          'error').then((isConfirm: any) => {

          });
      }
    });

  };

}
