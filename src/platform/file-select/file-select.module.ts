import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

import { CovalentHighlightModule } from '@covalent/highlight';

import { TdContainerDirective } from '../../components/';
import { TdFileSelectComponent } from './file-select.component';

@NgModule({
  imports: [
    CommonModule,
    CovalentHighlightModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
  ],
  declarations: [
    TdFileSelectComponent,
    TdContainerDirective,
  ],
  exports: [
    TdFileSelectComponent,
  ],
})
export class CovalentFileSelectModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CovalentFileSelectModule,
      providers: [ ],
    };
  }
}
