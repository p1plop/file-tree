import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Folder} from '../../../models/folder';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.scss']
})
export class FolderComponent implements OnInit {
  opened: string[] = [];
  openChildPath = new EventEmitter<string>();

  @Input() node: Folder;
  @Input() open: EventEmitter<string>;
  @Output() selected = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
    this.open.subscribe(path => {
      const pathArray = path.split('/');
      this.select(pathArray[0]);

      pathArray.splice(0, 1);
      if (pathArray.length) {
        setTimeout(() => {
          this.openChildPath.emit(pathArray.join('/'));
        }, 0);
      }
    });
  }

  select(path: string): void {
    const index = this.node.items.findIndex(item => item.name === path);
    if (index === -1) {
      return;
    }
    const selectedItem = this.node.items[index];
    if ('items' in selectedItem && selectedItem.items) {
      const i = this.opened.indexOf(selectedItem.name);
      if (i !== -1) {
        this.opened.splice(i, 1);
      } else {
        this.opened.push(selectedItem.name);
      }
    }
    this.selected.emit(path);
  }

  childSelected(path: string, parent: string): void {
    this.selected.emit(`${parent}/${path}`);
  }

  isOpened(name: string): boolean {
    return this.opened.includes(name);
  }

}
