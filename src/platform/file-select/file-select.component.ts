import { Component, AfterViewInit, Output, EventEmitter } from '@angular/core';

export interface IFile {
  path: string;
  name: string;
  icon: string;
  expansion_visible: boolean;
  contents?: string;
}

@Component({
  selector: 'td-file-select',
  templateUrl: './file-select.component.html',
  styleUrls: [ './file-select.component.scss' ],
})
export class TdFileSelectComponent implements AfterViewInit {

    files: IFile[] = [];
    prevPath: string = '';
    currentOpenedFile: IFile;
    pathHistory: string[] = [];
    pathFuture: string[] = [];
    homeDir: string = '';

   /**
    * onOpenFileContents: function($event)
    * Event emitted when a file is opened
    */
    @Output('openFile') openFile: EventEmitter<IFile> = new EventEmitter<IFile>();

    ngAfterViewInit(): void {
        // get the node.js "process" object
        let process: any  = electron.remote.process;
        // get the home dir from the process object environment variables
        this.homeDir = process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'];
        this.prevPath = this.homeDir;
        this.loadFiles('', true);
    }

  /**
   * loadFiles function that takes an endpoint of a path (file or directory name)
   * and try to traverse down it to find more files and directories
   * If it is a file then it will get the File Contents
   */
  loadFiles(pathEnd: string, clearFuture: boolean): void {
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
      this.pathHistory.push(this.prevPath);
      if (clearFuture) {
        this.pathFuture = [];
      }
    // If it is a file then create a dynamic expansion panel and
    // load in the size and modified date and file contents
    } else {
      let fileContents: string = fs.readFileSync(newPath, 'utf8');
      let file: IFile = {
        path: newPath.slice(0, newPath.lastIndexOf('/')),
        name: newPath.slice(newPath.lastIndexOf('/')),
        icon: 'description',
        expansion_visible: false,
        contents: fileContents,
      };
      this.currentOpenedFile = file;
      this.openFile.emit(file);
    }
  }

  /**
   * nextPage method to move forward in history of file traversion
   */
  nextPage(): void {
    // remove the path from future
    let futurePath: string = this.pathFuture.pop();
    // go to the future path
    this.prevPath = futurePath;
    this.loadFiles('', false);
  }

  /**
   * previousPage method to move backward in history of file traversion
   */
  previousPage(): void {
    // remove the current path from history
    let currentPath: string = this.pathHistory.pop();
    // add the current path to the future
    this.pathFuture.push(currentPath);
    // remove the previous path from history and then go to it
    let previousPath: string = this.pathHistory.pop();
    this.prevPath = previousPath;
    this.loadFiles('', false);
  }

  /**
   * canShowPrevious method to determine if there are previous results that could be shown
   */
  canShowPrevious(): boolean {
    return (this.pathHistory.length > 1);
  }

  /**
   * canShowNext method to determine if there are more results that could be shown
   */
  canShowNext(): boolean {
    return (this.pathFuture.length > 0);
  }
}
