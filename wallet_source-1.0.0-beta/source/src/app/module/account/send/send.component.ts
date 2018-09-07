import {Component, OnInit} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {AppConstants} from '../../../config/constants';
import {TranslateService} from '@ngx-translate/core';
import {SessionStorageService} from '../../../services/session-storage.service';

@Component({
    selector: 'app-send',
    templateUrl: './send.component.html',
    styleUrls: ['./send.component.scss']
})
export class SendComponent implements OnInit {
    routeChange = new Subject();
    selectedLanguage: string;
    constructor(public sessionStorageService: SessionStorageService,
                public translate: TranslateService) {
        this.selectedLanguage = this.sessionStorageService.getFromSession(AppConstants.languageConfig.SESSION_SELECTED_LANGUAGE_KEY);
        this.translate.use(this.selectedLanguage);
    }

    ngOnInit() {

    }

    onTabChange() {
        this.routeChange.next();
    }
}
