import { Component, OnInit } from '@angular/core';
import { DataStoreService } from 'app/services/data-store.service';
@Component({
    selector: 'app-decrypt-product',
    templateUrl: './decrypt-product.component.html',
    styleUrls: ['./decrypt-product.component.scss']
})
export class DecryptProductComponent implements OnInit {
    details: string = "";
    constructor() { }

    ngOnInit() {
        this.details = DataStoreService.get('decrypt_value')
        console.log("details==>", this.details)
    }
}
