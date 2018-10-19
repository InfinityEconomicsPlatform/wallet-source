import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
import { ProcessWithoutApprovalComponent } from './list-a-product/process-without-approval/process-without-approval.component';
import { DefferedHeightComponent } from './list-a-product/deffered-height/deffered-height.component';
import { FixedAccountsComponent } from './list-a-product/fixed-accounts/fixed-accounts.component';
import { AmountComponent } from './list-a-product/amount/amount.component';
import { AssetsComponent } from './list-a-product/assets/assets.component';
import { CurrenciesComponent } from './list-a-product/currencies/currencies.component';
import { TransactionHashComponent } from './list-a-product/transaction-hash/transaction-hash.component';
import { SecretHashComponent } from './list-a-product/secret-hash/secret-hash.component';
import { SearchComponent } from './search/search.component';

@NgModule({
    imports: [
        CommonModule,
        MarketplaceRoutingModule,
        SharedModule,
        NgxDatatableModule,
        FormsModule
    ],
    declarations: [
        StoreComponent,
        TagListComponent,
        PurchaseComponent,
        ListingComponent,
        PurchasedComponent,
        ListAProductComponent,
        ProcessWithoutApprovalComponent,
        DefferedHeightComponent,
        FixedAccountsComponent,
        AmountComponent,
        AssetsComponent,
        CurrenciesComponent,
        TransactionHashComponent,
        SecretHashComponent,
        SearchComponent
    ],
    providers: [
        MarketplaceService
    ]
})
export class MarketplaceModule { }
