import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreComponent } from './store/store.component';
import { TagListComponent } from './tag-list/tag-list.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { ListingComponent } from './listing/listing.component';
import { PurchasedComponent } from './purchased/purchased.component';
import { ListAProductComponent } from './list-a-product/list-a-product.component';
import { SearchComponent } from './search/search.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ChangePriceComponent } from './listing/change-price/change-price.component';
import { ChangeQuantityComponent } from './listing/change-quantity/change-quantity.component';
import { DeleteProductComponent } from './listing/delete-product/delete-product.component';
import { PendingOrdersComponent } from './pending-orders/pending-orders.component';
import { CompletedOrdersComponent } from './completed-orders/completed-orders.component';
import { DeliverComponent } from './deliver/deliver.component';
import { DecryptProductComponent } from './decrypt-product/decrypt-product.component'
const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'store'
    },
    {
        path: 'store',
        component: StoreComponent
    },
    {
        path: 'tag',
        component: TagListComponent
    },
    {
        path: 'search',
        component: SearchComponent
    },
    {
        path: 'seller',
        component: SearchComponent
    },
    {
        path: 'list-a-product',
        component: ListAProductComponent
    },
    {
        path: 'product-listed',
        component: ListingComponent
    },
    {
        path: 'purchase',
        component: PurchaseComponent
    },
    {
        path: 'purchased',
        component: PurchasedComponent
    },
    {
        path: 'product-details',
        component: ProductDetailsComponent
    },
    {
        path: 'change-price',
        component: ChangePriceComponent
    },
    {
        path: 'change-quantity',
        component: ChangeQuantityComponent
    },
    {
        path: 'remove-product',
        component: DeleteProductComponent
    },
    {
        path: 'pending-orders',
        component: PendingOrdersComponent
    },
    {
        path: 'completed-orders',
        component: CompletedOrdersComponent
    },
    {
        path: 'delivery',
        component: DeliverComponent
    },
    {
        path: 'decrypt-product',
        component: DecryptProductComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MarketplaceRoutingModule { }
