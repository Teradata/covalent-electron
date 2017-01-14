import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

// Normally would import in node modules here instead they are in declared in electron-load.js and typings.d.ts
// Need to do this until able to modify webpack config in Angular CLI
// import * as fs from 'fs';
// import * as electron from 'electron';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements AfterViewInit {

  constructor(private _router: Router) {}

  ngAfterViewInit(): void {
    // do Something
  }

  saveEditorValue(monacoEditor: any): void {
    monacoEditor.getValue().subscribe((value: string) => {
      alert(value);
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
    monacoEditor.registerLanguage(language);
    monacoEditor.language = 'mySpecialLanguage';
  }
}
