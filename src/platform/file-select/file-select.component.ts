import { Component, AfterViewInit, Output, EventEmitter } from '@angular/core';

export interface IFile {
  path: string;
  name: string;
  icon: string;
  expansion_visible: boolean;
}

@Component({
  selector: 'td-file-select',
  templateUrl: './file-select.component.html',
  styleUrls: [ './file-select.component.scss' ],
})
export class TdFileSelectComponent implements AfterViewInit {

    files: IFile[] = [];
    prevPath: string = '';

   /**
    * onOpenFileContents: function($event)
    * Event emitted when a file is opened
    */
    @Output('openFile') openFile: EventEmitter<string> = new EventEmitter<string>();

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
   * If it is a file then it will get the File Contents
   */
  loadFiles(pathEnd: string): void {
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
      let fileContents: string = fs.readFileSync(newPath, 'utf8');
      this.openFile.emit(fileContents);
    }
  }
}
