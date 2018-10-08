import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarketplaceRoutingModule } from './marketplace-routing.module';
import { StoreComponent } from './store/store.component';
import { SharedModule } from '../../shared/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MarketplaceService } from './marketplace.service';
import { TagListComponent } from './tag-list/tag-list.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { ListingComponent } from './listing/listing.component';
import { PurchasedComponent } from './purchased/purchased.component';
import { ListAProductComponent } from './list-a-product/list-a-product.component';

@NgModule({
    imports: [
        CommonModule,
        MarketplaceRoutingModule,
        SharedModule,
        NgxDatatableModule
    ],
    declarations: [
        StoreComponent,
        TagListComponent,
        PurchaseComponent,
        ListingComponent,
        PurchasedComponent,
        ListAProductComponent
    ],
    providers: [
        MarketplaceService
    ]
})
export class MarketplaceModule { }
