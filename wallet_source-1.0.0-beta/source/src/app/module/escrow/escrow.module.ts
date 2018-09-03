import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MyEscrowComponent} from './my-escrow/my-escrow.component';
import {CreateEscrowComponent} from './create-escrow/create-escrow.component';
import {EscrowRoutingModule} from './escrow-routing.module';
import {SharedModule} from '../../shared/shared.module';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {ArchwizardModule} from 'angular-archwizard';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {EscrowService} from './escrow.service';
import {EscrowStatusComponent} from './my-escrow/escrow-status/escrow-status.component';
import {SignEscrowComponent} from './my-escrow/sign-escrow/sign-escrow.component';
import {FormsModule} from '@angular/forms';
import {AliasesService} from '../aliases/aliases.service';

@NgModule({
    imports: [
        CommonModule,
        EscrowRoutingModule,
        SharedModule,
        Ng2SmartTableModule,
        NgxDatatableModule,
        ArchwizardModule,
        FormsModule
    ],
    declarations: [
        MyEscrowComponent,
        CreateEscrowComponent,
        EscrowStatusComponent,
        SignEscrowComponent
    ],
    providers: [
        EscrowService,
        AliasesService
    ]
})
export class EscrowModule {
}
