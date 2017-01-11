import { Component, Input, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'td-monaco-editor',
  templateUrl: './monaco-editor.component.html',
  styleUrls: [ './monaco-editor.component.scss' ],
})
export class TdMonacoEditorComponent implements AfterViewInit {

  private _width: string = '640px';
  private _height: string = '480px';
  private _appPath: string = electron.remote.app.getAppPath();
  private _webview: any;
  private _editorValue: string = '';
  private _editorLanguage: string = 'javascript';
  private _subject: Subject<string> = new Subject();

  private _monacoHTML: string = `<!DOCTYPE html>
    <html>
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta http-equiv="Content-Type" content="text/html;charset=utf-8" >
        <link rel="stylesheet" data-name="vs/editor/editor.main" 
              href="file:///node_modules/monaco-editor/min/vs/editor/editor.main.css">
    </head>
    <body>
    <div id="container" style="width:${this.width};height:${this.height};border:1px solid grey"></div>
    <script>
        // Get the ipcRenderer of electron for communication
        const {ipcRenderer} = require('electron');
    </script>
    <script src="file:///node_modules/monaco-editor/min/vs/loader.js"></script>
    <script>
        var editor;
        require.config({
            baseUrl: '${this._appPath}/node_modules/monaco-editor/min'
        });
        self.module = undefined;
        self.process.browser = true;

        require(['vs/editor/editor.main'], function() {
            editor = monaco.editor.create(document.getElementById('container'), {
                value: '${this.editorValue}',
                language: '${this.editorLanguage}',
            });
        });

        // Do something according to a request of your mainview
        ipcRenderer.on('getEditorContent', function(){
            ipcRenderer.sendToHost("editorContent", editor.getValue());
        });
    </script>
    </body>
    </html>`;

  /**
   * editorValue?: string
   * Value in the Editor since getEditorContent was called
   */
  get editorValue(): string {
    return this._editorValue;
  }

  /**
   * width?: string
   * width of the editor on the page
   */
  @Input('width')
  set width(width: string) {
    this._width = width;
  }
  get width(): string {
    return this._width;
  }

  /**
   * editorLanguage?: string
   * language used in edtior
   */
  @Input('editorLanguage')
  set editorLanguage(editorLanguage: string) {
    this._editorLanguage = editorLanguage;
  }
  get editorLanguage(): string {
    return this._editorLanguage;
  }

  /**
   * height?: string
   * height of the editor on the page
   */
  @Input('height')
  set height(height: string) {
    this._height = height;
  }
  get height(): string {
    return this._height;
  }

  /**
   * getEditorContent?: function
   * Returns the content within the monaco editor
   */
  getEditorContent(): Observable<string> {
      this._webview.send('getEditorContent');
      return this._subject.asObservable();
  }

  ngAfterViewInit(): void {
    // dynamically create the Electron Webview Element
    // this will sandbox the monaco code into its own DOM and its own
    // javascript instance. Need to do this to avoid problems with monaco
    // using AMD Requires and Electron using Node Requires
    // see https://github.com/Microsoft/monaco-editor/issues/90
    this._webview = document.createElement('webview');
    this._webview.setAttribute('nodeintegration', 'true');
    this._webview.setAttribute('disablewebsecurity', 'true');
    // take the html content for the webview and base64 encode it and use as the src tag
    this._webview.setAttribute('src', 'data:text/html;base64,' + window.btoa(this._monacoHTML));
    this._webview.setAttribute('style', 'display:inline-flex; width:' + this.width + '; height:' + this.height);
    /*this._webview.addEventListener('dom-ready', () => {
        this._webview.openDevTools();
    });*/

    // Process the data from the webview
    this._webview.addEventListener('ipc-message', (event: any) => {
        if (event.channel === 'editorContent') {
            this._editorValue = event.args[0];
            this._subject.next(this._editorValue);
            this._subject.complete();
        }
    });

    // append the webview to the DOM
    let monacoContainer: HTMLElement = document.getElementById('monacoContainer');
    monacoContainer.appendChild(this._webview);
  }
}
