import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { appRoutes, appRoutingProviders } from './app.routes';

import { CovalentCoreModule, TD_LOADING_ENTRY_COMPONENTS } from '@covalent/core';
import { CovalentFileModule } from '@covalent/file-upload';
import { CovalentHighlightModule } from '@covalent/highlight';
import { CovalentHttpModule } from '@covalent/http';
import { CovalentMarkdownModule } from '@covalent/markdown';
import { CovalentJsonFormatterModule } from '@covalent/json-formatter';
import { CovalentChartsModule } from '@covalent/charts';
import { CovalentDataTableModule } from '@covalent/data-table';
import { CovalentPagingModule } from '@covalent/paging';
import { CovalentSearchModule } from '@covalent/search';
import { FileExpansionPanelComponent, TdContainerDirective } from '../components/';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FileExpansionPanelComponent,
    TdContainerDirective,
  ], // directives, components, and pipes owned by this NgModule
  imports: [
    BrowserModule,
    CovalentCoreModule.forRoot(),
    CovalentFileModule.forRoot(),
    CovalentHttpModule.forRoot(),
    CovalentHighlightModule.forRoot(),
    CovalentMarkdownModule.forRoot(),
    CovalentJsonFormatterModule.forRoot(),
    CovalentChartsModule.forRoot(),
    CovalentDataTableModule.forRoot(),
    CovalentMarkdownModule.forRoot(),
    CovalentPagingModule.forRoot(),
    CovalentSearchModule.forRoot(),
    appRoutes,
  ], // modules needed to run this module
  providers: [
    appRoutingProviders,
  ], // additional providers needed for this module
  entryComponents: [
    TD_LOADING_ENTRY_COMPONENTS,
    FileExpansionPanelComponent,
  ],
  bootstrap: [ AppComponent ],
})
export class AppModule {}
