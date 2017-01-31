import { Injectable, ViewContainerRef, ComponentFactory,
         ComponentFactoryResolver, ComponentRef } from '@angular/core';

import { FileExpansionPanelComponent } from '../components';

@Injectable()
export class FileExpansionService {

  private _fileExpansionResolver: ComponentFactory<FileExpansionPanelComponent>;
  private _fileExpansionComponentRef: ComponentRef<FileExpansionPanelComponent>;

  private _previousShownFile: {expansion_visible: boolean};

  constructor(componentFactoryResolver: ComponentFactoryResolver) {
    // Allows access to the FileExpansionPanelComponent so it can be created dynamically later
    this._fileExpansionResolver = componentFactoryResolver.resolveComponentFactory(FileExpansionPanelComponent);
  }

  /**
   * any fileExpansion that is currently being shown
   */
  remove(): boolean {
    // Remove any fileExpansion that is currently being shown
    if (this._previousShownFile) {
      this._fileExpansionComponentRef.destroy();
      this._previousShownFile.expansion_visible = false;
      this._previousShownFile = undefined;
      return true;
    }
    return false;
  }

  /**
   * creates fileExpansion component dynamically, removes previous one if there was one and returns its instance
   */
  create(file: {expansion_visible: boolean},
                      viewContainerRef: ViewContainerRef): FileExpansionPanelComponent {
    // Hide the file in the list
    file.expansion_visible = true;
    // Remove any fileExpansion that is currently being shown
    this.remove();
    // Hold on to this file so we can bring it back when they view the next one
    this._previousShownFile = file;

    // Let the magic happen here.  Creates the fileExpansion from the fileExpansionResolver and places
    // it into a ViewContainerRef
    this._fileExpansionComponentRef = viewContainerRef
      .createComponent<FileExpansionPanelComponent>(this._fileExpansionResolver);
    // Subscribe to the collapsed event so when collapsed
    // the row will turn back to a list item instead of expansion panel
    this._fileExpansionComponentRef.instance.collapsed.subscribe(() => {
      this.remove();
    });

    return this._fileExpansionComponentRef.instance;
  }

}
