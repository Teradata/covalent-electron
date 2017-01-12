import { Component, AfterViewInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';

import { FileExpansionPanelComponent } from '../../../components';
import { FileExpansionService } from '../../../services';

// Normally would import in node modules here instead they are in declared in electron-load.js and typings.d.ts
// Need to do this until able to modify webpack config in Angular CLI
// import * as fs from 'fs';
// import * as electron from 'electron';

export interface IFile {
  path: string;
  name: string;
  icon: string;
  expansion_visible: boolean;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  viewProviders: [ FileExpansionService ],
})
export class HomeComponent implements AfterViewInit {

  files: IFile[] = [];
  prevPath: string = '';
  editorValue: string = '';

  constructor(private _router: Router,
              private _fileExpansionService: FileExpansionService) {}

  ngAfterViewInit(): void {
    // get the node.js "process" object
    let process: any  = electron.remote.process;
    // get the home dir from the process object environment variables
    let homeDir: string = process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'];
    this.prevPath = homeDir;
    this.loadFiles('');
  }

  /**
   * loadFiles function that takes an endpoint of a path (file or directory name)
   * and try to traverse down it to find more files and directories
   * If it is a file then it will create a dynamic expansion panel and 
   * load in the size and modified date and file contents into it
   */
  loadFiles(pathEnd: string, expansionContainer?: ViewContainerRef): void {
    // append the end of the path to the previous directories that have been traversed
    let newPath: string = path.join(this.prevPath, pathEnd);
    // If it is a directory get traverse more
    if (fs.lstatSync(newPath).isDirectory()) {
      this.files = [];
      let filesList: any[] = fs.readdirSync(newPath);
      for (let file of filesList) {
        let fileObj: IFile = {
          path: newPath,
          name: file,
          icon: fs.lstatSync(path.join(newPath, file)).isDirectory() ? 'folder' : 'description',
          expansion_visible: false,
        };
        this.files.push(fileObj);
      }
      this.prevPath = newPath;
    // If it is a file then create a dynamic expansion panel and 
    // load in the size and modified date and file contents
    } else {
      let fileObj: IFile = {
        path: newPath,
        name: pathEnd,
        icon: 'description',
        expansion_visible: true,
      };
      let instance: FileExpansionPanelComponent = this._fileExpansionService.create(fileObj, expansionContainer);

      let fileStats: any = fs.statSync(newPath);
      let fileContents: string = fs.readFileSync(newPath, 'utf8');

      // Set the size, contents, and filePath, etc to be displayed in the fileExpansion
      instance.size = fileStats.size;
      instance.contents = fileContents;
      instance.label = 'File Details';
      instance.filePath = fileObj.path;
      instance.modifiedDate = fileStats.mtime;
    }
  }

  saveEditorValue(monacoEditor: any): void {
    monacoEditor.getEditorContent().subscribe((value: string) => {
      this.editorValue = value;
    });
  }

  registerCustomLanguage(monacoEditor: any): void {
    let language: any = {
      id: 'mySpecialLanguage',
      monarchTokensProvider: [
          ['/\\[error.*/', 'custom-error'],
          ['/\\[notice.*/', 'custom-notice'],
          ['/\\[info.*/', 'custom-info'],
          ['/\\[[a-zA-Z 0-9:]+\\]/', 'custom-date'],
      ],
      monarchTokensProviderCSS: `
        .monaco-editor .token.custom-info {
          color: grey;
        }
        .monaco-editor .token.custom-error {
          color: red;
          font-weight: bold;
          font-size: 1.2em;
        }
        .monaco-editor .token.custom-notice {
          color: orange;
        }

        .monaco-editor .token.custom-date {
          color: green;
        }
      `,
      completionItemProvider: [
        {
          label: 'simpleText',
          kind: 'monaco.languages.CompletionItemKind.Text',
        }, {
          label: 'testing',
          kind: 'monaco.languages.CompletionItemKind.Keyword',
          insertText: 'testing({{condition}})',
        },
        {
          label: 'ifelse',
          kind: 'monaco.languages.CompletionItemKind.Snippet',
          insertText: [
            'if ({{condition}}) {',
            '\t{{}}',
            '} else {',
            '\t',
            '}',
          ].join('\n'),
          documentation: 'If-Else Statement',
        },
      ],
    };
    monacoEditor.registerEditorLanguage(language);
    monacoEditor.editorLanguage = 'mySpecialLanguage';
  }
}
