import { Directive, ViewContainerRef } from '@angular/core';

@Directive({selector: '[tdContainer]', exportAs: 'tdContainer'})
export class TdContainerDirective {

  constructor(public viewContainerRef: ViewContainerRef) {

  }

}
