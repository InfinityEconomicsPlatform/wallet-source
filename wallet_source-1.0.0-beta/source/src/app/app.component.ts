import { Component, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { TranslateService } from '@ngx-translate/core';
import { AppConstants } from './config/constants';
import { SessionStorageService } from './services/session-storage.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent {

    //Set toastr container ref configuration for toastr positioning on screen
    constructor(public toastr: ToastsManager, vRef: ViewContainerRef, public sessionStorageService: SessionStorageService,public translate: TranslateService) {
        this.toastr.setRootViewContainerRef(vRef);

        this.setLanguage();
    }

    setLanguage(){
        let selectedLanguage = this.sessionStorageService.getFromSession(AppConstants.languageConfig.SESSION_SELECTED_LANGUAGE_KEY);
        
        if(selectedLanguage){
            this.translate.use(selectedLanguage);
        }else{
            this.translate.use(AppConstants.languageConfig.DEFAULT);
            this.sessionStorageService.saveToSession(AppConstants.languageConfig.SESSION_SELECTED_LANGUAGE_KEY, AppConstants.languageConfig.DEFAULT);
        }
    }
}