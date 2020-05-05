import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

import { CovalentHighlightModule } from '@covalent/highlight';

import { TdContainerDirective } from '../../components/';
import { TdFileSelectComponent } from './file-select.component';

@NgModule({
  imports: [
    CommonModule,
    CovalentHighlightModule,
    MatCardModule,
    MatExpansionModule,
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
  static forRoot(): ModuleWithProviders<CovalentFileSelectModule> {
    return {
      ngModule: CovalentFileSelectModule,
      providers: [ ],
    };
  }
}
