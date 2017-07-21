import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';

import { CovalentHighlightModule } from '@covalent/highlight';
import { CovalentMarkdownModule } from '@covalent/markdown';

import { TdContainerDirective } from '../../components/';
import { TdFileSelectComponent } from './file-select.component';

@NgModule({
  imports: [
    CommonModule,
    CovalentHighlightModule,
    CovalentMarkdownModule,
    MaterialModule.forRoot(),
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
