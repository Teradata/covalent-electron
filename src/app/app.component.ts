import { Component, ViewContainerRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

@Component({
  selector: 'app-covalent',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  routes: Object[] = [{
      icon: 'home',
      route: '.',
      title: 'Home',
    },
  ];

  constructor(private _iconRegistry: MatIconRegistry,
              private _domSanitizer: DomSanitizer,
              viewContainerRef: ViewContainerRef) {
      this._iconRegistry.addSvgIconInNamespace('assets', 'covalent',
      this._domSanitizer.bypassSecurityTrustResourceUrl('app/assets/icons/covalent.svg'));
    }

}
