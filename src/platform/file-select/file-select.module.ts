import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule, MatIconModule, MatListModule } from '@angular/material';

import { CovalentHighlightModule } from '@covalent/highlight';
import { CovalentMarkdownModule } from '@covalent/markdown';

import { TdContainerDirective } from '../../components/';
import { TdFileSelectComponent } from './file-select.component';

@NgModule({
  imports: [
    CommonModule,
    CovalentHighlightModule,
    CovalentMarkdownModule,
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
