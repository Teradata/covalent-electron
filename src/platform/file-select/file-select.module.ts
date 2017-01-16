import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';

import { CovalentCoreModule } from '@covalent/core';
import { CovalentHighlightModule } from '@covalent/highlight';
import { CovalentMarkdownModule } from '@covalent/markdown';

import { TdContainerDirective } from '../../components/';
import { TdFileSelectComponent } from './file-select.component';

@NgModule({
  imports: [
    CommonModule,
    CovalentCoreModule.forRoot(),
    CovalentHighlightModule.forRoot(),
    CovalentMarkdownModule.forRoot(),
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
