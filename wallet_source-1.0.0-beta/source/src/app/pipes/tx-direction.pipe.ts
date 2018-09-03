import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'txDirection'
})
export class TxDirectionPipe implements PipeTransform {

  transform(value: any, args?: any): any {

    if (value === args) {
        return ' <i class="fa fa-chevron-circle-up success" aria-hidden="true" style="color:red;"></i> ';
    } else {
        return '<i class="fa fa-chevron-circle-down danger" aria-hidden="true" style="color:green;"></i>';
    }
  }

}
