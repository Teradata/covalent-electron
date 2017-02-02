import { Component, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { TdCollapseAnimation } from '@covalent/core';

// Normally would import in node modules here instead they are in declared in electron-load.js and typings.d.ts
// Need to do this until able to modify webpack config in Angular CLI
// import * as fs from 'fs';
// import * as electron from 'electron';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    TdCollapseAnimation(),
  ],
})
export class HomeComponent implements AfterViewInit {

  showFileSelect: boolean = true;
  showSettings: boolean = false;
  // chart options
  barGraphData: any[] = [];
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = true;
  showLegend: boolean = false;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Years with Bank';
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'Amount of Users';
  colorScheme: any = {
    domain: ['#1976D2', '#039BE5', '#00BCD4', '#FB8C00', '#FFA726'],
  };
  // form fields
  url: string = '';
  driverName: string = '';
  username: string = '';
  password: string = '';

  constructor(private _router: Router,
              private _changeDetectorRef: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    // do Something
  }

  toggleSettings(): void {
    if (this.showFileSelect) {
      this.showFileSelect = false;
      this.showSettings = true;
    } else {
      this.showFileSelect = true;
      this.showSettings = false;
    }
  }

  saveEditorValue(monacoEditor: any): void {
    monacoEditor.getValue().subscribe((value: string) => {
      alert(value);
    });
  }

  executeSQL(monacoEditor: any): void {
    monacoEditor.getValue().subscribe((value: string) => {
      let spawn: any = child_process.spawn;
      // @todo need the windows one also
      let javaPath: string = '/node_modules/node-jre/jre/jre1.8.0_112.jre/Contents/Home/bin/java';
      let childProcess: any = spawn(electron.remote.app.getAppPath() + javaPath,
                                    ['-cp', electron.remote.app.getAppPath() + '/lib/*', 'JDBCWrapper']);
      childProcess.stdout.on('data', (data: string) => {
          let returnData: string = data.toString();
          // prompted to give jdbc url
          if (returnData === 'Enter url:') {
            // send in url from form
            childProcess.stdin.write(this.url + '\n');
          // prompted to give jdbc driver name
          } else if (returnData === 'Enter driverName:') {
            // send in driverName from form
            childProcess.stdin.write(this.driverName + '\n');
          // prompted to give jdbc username
          } else if (returnData === 'Enter username:') {
            // send in username from form
            childProcess.stdin.write(this.username + '\n');
          // prompted to give jdbc password
          } else if (returnData === 'Enter password:') {
            // send in password from form
            childProcess.stdin.write(this.password + '\n');
            childProcess.stdin.write('runSQL\n');
            // remove all new lines
            let sql: string = value.replace(/(\r\n|\n|\r)/gm, '');
            childProcess.stdin.write(sql + '\n');
          } else {
            /* tslint:disable-next-line */
            let outputData: any[] = eval(returnData);
            if (outputData.length > 0) {
              // take the result data and massage it into the structure the table needs it
              let barData: any[] = [];
              for (let entry of outputData) {
                  // take the result data and massage it into the structure the bar chart needs it
                  barData.push({
                      name: entry.xval,
                      value: entry.xcnt,
                  });
                  this.barGraphData = barData;
              }
              // repaint the screen
              this._changeDetectorRef.detectChanges();
            }
          }
      });
      childProcess.stderr.on('data', (data: string) => {
          /* tslint:disable-next-line */
          console.error(data.toString());
      });
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
      customTheme: {
        id: 'myCustomTheme',
        theme: {
          base: 'vs-dark',
          inherit: true,
          rules: [
            { token: 'custom-info', foreground: '808080' },
            { token: 'custom-error', foreground: 'ff0000', fontStyle: 'bold' },
            { token: 'custom-notice', foreground: 'FFA500' },
            { token: 'custom-date', foreground: '008800' },
          ],
        },
      },
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
    monacoEditor.theme = 'myCustomTheme';
    monacoEditor.language = 'mySpecialLanguage';
  }
}
