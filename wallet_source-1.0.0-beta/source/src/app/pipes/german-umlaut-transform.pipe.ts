import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'germanUmlautTransform'
})
export class GermanUmlautTransformPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return $.parseHTML(value)[0].nodeValue;
  }

}
