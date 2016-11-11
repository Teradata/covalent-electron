import { Component } from '@angular/core';

@Component({
  selector: 'docs-covalent',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class DocsAppComponent {

  routes: Object[] = [{
      icon: 'home',
      route: '.',
      title: 'Home',
    },
  ];
}
