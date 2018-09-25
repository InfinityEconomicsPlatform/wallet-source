import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreComponent } from './store/store.component';
import { TagListComponent } from './tag-list/tag-list.component';
import { PurchaseComponent } from './purchase/purchase.component';

const routes: Routes = [
    {
        path: '',
        component: StoreComponent
    },
    {
        path: 'tag',
        component: TagListComponent
    },
    {
        path: 'purchase',
        component: PurchaseComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MarketplaceRoutingModule { }
