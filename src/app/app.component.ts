import { Component } from '@angular/core';

@Component({
  selector: 'app-covalent',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  routes: Object[] = [{
      icon: 'home',
      route: '.',
      title: 'Home',
    },
  ];
}
