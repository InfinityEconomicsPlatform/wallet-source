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
import { SearchComponent } from './search/search.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
<<<<<<< HEAD
import { ChangePriceComponent } from './listing/change-price/change-price.component';
import { ChangeQuantityComponent } from './listing/change-quantity/change-quantity.component';
import { DeleteProductComponent } from './listing/delete-product/delete-product.component';
import { PendingOrdersComponent } from './pending-orders/pending-orders.component';
import { CompletedOrdersComponent } from './completed-orders/completed-orders.component';
import { DeliverComponent } from './deliver/deliver.component';
=======
>>>>>>> Added product details page

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
<<<<<<< HEAD
        SearchComponent,
        ProductDetailsComponent,
        ChangePriceComponent,
        ChangeQuantityComponent,
        DeleteProductComponent,
        PendingOrdersComponent,
        CompletedOrdersComponent,
        DeliverComponent
=======
        ProcessWithoutApprovalComponent,
        DefferedHeightComponent,
        FixedAccountsComponent,
        AmountComponent,
        AssetsComponent,
        CurrenciesComponent,
        TransactionHashComponent,
        SecretHashComponent,
        SearchComponent,
        ProductDetailsComponent
>>>>>>> Added product details page
    ],
    providers: [
        MarketplaceService
    ]
})
export class MarketplaceModule { }
