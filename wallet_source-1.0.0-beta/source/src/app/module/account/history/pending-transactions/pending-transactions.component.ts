import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../account.service';
import {ActivatedRoute, Router} from "@angular/router";
import { DataStoreService } from '../../../../services/data-store.service';
import {Page} from '../../../../config/page';

@Component({
  selector: 'app-pending-transactions',
  templateUrl: './pending-transactions.component.html',
  styleUrls: ['./pending-transactions.component.scss']
})

export class PendingTransactionsComponent implements OnInit {

  page = new Page();
  rows = new Array<any>();

  constructor(private accountService: AccountService,
              private route: ActivatedRoute,
              private router: Router) {
    this.page.pageNumber = 0;
    this.page.size = 10;
  }

  accountId = '';
  accountRs = '';

  ngOnInit() {
    this.accountId = this.accountService.getAccountDetailsFromSession('accountId');
    this.accountRs = this.accountService.getAccountDetailsFromSession('accountRs');

    this.setPage({ offset: 0 });
  }

  setPage(pageInfo) {
    this.page.pageNumber = pageInfo.offset;
    this.accountService.getAccountUnconfirmedTransactions(this.accountId)
    .subscribe(response => {
      this.rows = response.unconfirmedTransactions;
        if (this.page.pageNumber === 0 && this.rows.length < 10) {
            this.page.totalElements = this.rows.length;
        } else if (this.page.pageNumber > 0 && this.rows.length < 10) {
            this.page.totalElements = this.page.pageNumber * 10 + this.rows.length;
            this.page.totalPages = this.page.pageNumber;
        }
    });
  }

  goToDetails(row){
    DataStoreService.set('transaction-details',row);
    this.router.navigate(['/account/transactions/details']); // + row.fullHash
  }

  accountDetail(accountID) {
    // DataStoreService.set('user-details',{ id: accountID });
    this.router.navigate(['/account/transactions/user-details'], { queryParams: { id: accountID }});
  }

  reload() {
    this.setPage({ offset: 0 });
  }

}
