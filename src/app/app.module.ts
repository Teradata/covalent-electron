import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { appRoutes, appRoutingProviders } from './app.routes';

import { MdButtonModule, MdIconModule, MdButtonToggleModule, MdMenuModule } from '@angular/material';
import { CovalentHttpModule } from '@covalent/http';
import { CovalentHighlightModule } from '@covalent/highlight';
import { CovalentMarkdownModule } from '@covalent/markdown';
import { CovalentCodeEditorModule } from '@covalent/code-editor';
import { CovalentFileSelectModule } from '../platform/file-select';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ], // directives, components, and pipes owned by this NgModule
  imports: [
    BrowserModule,
    MdButtonModule,
    MdIconModule,
    MdButtonToggleModule,
    MdMenuModule,
    CovalentHttpModule,
    CovalentHighlightModule,
    CovalentMarkdownModule,
    CovalentMarkdownModule,
    CovalentCodeEditorModule,
    CovalentFileSelectModule,
    BrowserAnimationsModule,
    appRoutes,
  ], // modules needed to run this module
  providers: [
    appRoutingProviders,
  ],
  bootstrap: [ AppComponent ],
})
export class AppModule {}
