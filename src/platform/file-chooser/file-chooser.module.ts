import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';

import { CovalentCoreModule } from '@covalent/core';
import { CovalentHighlightModule } from '@covalent/highlight';
import { CovalentMarkdownModule } from '@covalent/markdown';

import { TdContainerDirective } from '../../components/';
import { TdFileChooserComponent } from './file-chooser.component';

@NgModule({
  imports: [
    CommonModule,
    CovalentCoreModule.forRoot(),
    CovalentHighlightModule.forRoot(),
    CovalentMarkdownModule.forRoot(),
    MaterialModule.forRoot(),
  ],
  declarations: [
    TdFileChooserComponent,
    TdContainerDirective,
  ],
  exports: [
    TdFileChooserComponent,
  ],
})
export class CovalentFileChooserModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CovalentFileChooserModule,
      providers: [ ],
    };
  }
}
