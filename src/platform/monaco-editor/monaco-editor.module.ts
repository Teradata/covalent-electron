import { NgModule, ModuleWithProviders } from '@angular/core';

import { CommonModule } from '@angular/common';

import { MaterialModule } from '@angular/material';

import { TdMonacoEditorComponent } from './monaco-editor.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule.forRoot(),
  ],
  declarations: [
    TdMonacoEditorComponent,
  ],
  exports: [
    TdMonacoEditorComponent,
  ],
})
export class CovalentMonacoEditorModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CovalentMonacoEditorModule,
      providers: [ ],
    };
  }
}