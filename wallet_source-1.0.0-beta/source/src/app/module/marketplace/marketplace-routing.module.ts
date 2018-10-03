import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreComponent } from './store/store.component';
import { TagListComponent } from './tag-list/tag-list.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { ListingComponent } from './listing/listing.component';
import { PurchasedComponent } from './purchased/purchased.component';

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
        path: 'list-product',
        component: ListingComponent
    },
    {
        path: 'purchase',
        component: PurchaseComponent
    },
    {
        path: 'purchased',
        component: PurchasedComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MarketplaceRoutingModule { }
