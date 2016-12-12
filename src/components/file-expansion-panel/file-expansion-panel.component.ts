import { Component, Output, EventEmitter, } from '@angular/core';

/*
 * FileExpansionPanelComponent wrapper around td-expansion-panel that allows to put in allows
 * for a files details to be embedded in an expansion panel and then this component can be used
 * elsewhere, in a list for example
 */
@Component({
  selector: 'file-expansion-panel',
  templateUrl: './file-expansion-panel.component.html',
  styleUrls: ['./file-expansion-panel.component.scss'],
})
export class FileExpansionPanelComponent {
  size: number;
  contents: string;
  label: string;
  filePath: string;
  modifiedDate: string;

  @Output('collapsed') collapsed: EventEmitter<void> = new EventEmitter<void>();

  emitCollapsed(): void {
    this.collapsed.emit(undefined);
  }
}
