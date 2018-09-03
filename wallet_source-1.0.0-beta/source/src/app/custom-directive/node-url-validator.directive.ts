import { Directive, forwardRef } from "@angular/core";
import { NG_ASYNC_VALIDATORS, Validator, AbstractControl, AsyncValidator } from "@angular/forms";
import { Observable } from "rxjs";
import { LocalhostService } from "../services/localhost.service";

@Directive({
  selector: '[appNodeUrlValidatorDirective]',
  providers: [{
    provide: NG_ASYNC_VALIDATORS, useExisting: forwardRef(() => NodeUrlValidatorDirective), multi: true
  }]
})
export class NodeUrlValidatorDirective implements Validator {

  constructor(private localhostService: LocalhostService) { }

  isValidUrl(value) {alert(value)
    // return this.localhostService.isValidUrl(value);
    return new Observable(observer => {
      observer.next(20 === 20 ? {asyncInvalid: true} : {asyncInvalid: true});
      observer.complete();
    });
  }

  validate(c: AbstractControl) {
    return this.isValidUrl(c.value);
  }
}