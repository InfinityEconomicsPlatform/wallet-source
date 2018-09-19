import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarketplaceRoutingModule } from './marketplace-routing.module';
import { StoreComponent } from './store/store.component';
import { SharedModule } from '../../shared/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MarketplaceService } from './marketplace.service';

@NgModule({
    imports: [
        CommonModule,
        MarketplaceRoutingModule,
        SharedModule,
        NgxDatatableModule
    ],
    declarations: [
        StoreComponent
    ],
    providers: [
        MarketplaceService
    ]
})
export class MarketplaceModule { }
