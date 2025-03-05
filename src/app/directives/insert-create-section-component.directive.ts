import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[insertCreateSectionComponent]'
})
export class InsertCreateSectionComponentDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
