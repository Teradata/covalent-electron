import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { appRoutes, appRoutingProviders } from './app.routes';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CovalentHighlightModule } from '@covalent/highlight';
import { CovalentCodeEditorModule } from '@covalent/code-editor';
import { CovalentFileSelectModule } from '../platform/file-select';
import { FileExpansionPanelComponent } from '../components/file-expansion-panel/file-expansion-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FileExpansionPanelComponent,
  ], // directives, components, and pipes owned by this NgModule
  imports: [
    BrowserModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatExpansionModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatSidenavModule,
    CovalentHighlightModule,
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
