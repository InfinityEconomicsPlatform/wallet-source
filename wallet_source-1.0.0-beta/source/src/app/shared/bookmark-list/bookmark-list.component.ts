import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {Page} from '../../config/page';
import {AddressService} from '../../module/account/address.service';
import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'app-bookmark-list',
  templateUrl: './bookmark-list.component.html',
  styleUrls: ['./bookmark-list.component.scss']
})
export class BookmarkListComponent implements OnInit {
    page = new Page();
    rows = new Array<any>();
    @Input()
    viewFor: string;
    @Input()
    bookMarkUpdateSubject: Subject<any>;
    @Output() selectEvent = new EventEmitter<string>();
    isSelectView = false;
    constructor(private router: Router, public addressService: AddressService) {
        this.page.pageNumber = 0;
        this.page.size = 6;
        this.getAllBookMarks();
    }
    ngOnInit() {
        this.setPage({ offset: 0 });

        switch (this.viewFor) {
            case 'mybookmark':
                this.isSelectView = false;
                this.bookMarkUpdateSubject.subscribe( (e) => {
                    this.getAllBookMarks();
                });
                break;
            case 'sendmessage':
            case 'simple':
            case 'deferred':
            case 'reference':
            case 'secret':
                this.isSelectView = true;
                break;
        }
    }
    getAllBookMarks() {
        let publicKey = this.addressService.getAccountDetailsFromSession('publicKey');
        this.addressService.getAllContacts(publicKey, (success) => {
            if (!success) {
                success = [];
            }

            this.rows = success;
        }, function (error) {
        });
    }
    setPage(pageInfo) {
        this.page.pageNumber = pageInfo.offset;
    }
    onAction(action, row) {
        if (action === 'select') {
            this.selectEvent.emit(row);
            if (this.viewFor === 'sendmessage') {
                this.router.navigate(['messages/send-message'],
                    { queryParams: {'recipient': row.accountRS}});
            } else {
                this.router.navigate(['account/send/' + this.viewFor],
                    { queryParams: {'recipient': row.accountRS}});
            }
        }
        if (action === 'delete') {
            let publicKey = this.addressService.getAccountDetailsFromSession('publicKey');
            this.addressService.deleteContact(publicKey, row.accountRS, () => {
                this.getAllBookMarks();
            }, function () {
                console.log('error');
            });
        }
    }


}
