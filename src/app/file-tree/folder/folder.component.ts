import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Folder} from '../../../models/folder';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.scss']
})
export class FolderComponent implements OnInit {
  opened: string[] = [];
  private _open: string;

  @Input() node: Folder;
  @Input() set open(value: string) {
    this._open = value;

    if (value && this.depth !== undefined) {
      const pathArray = value.split('/');
      this.select(pathArray[this.depth], pathArray.length - 1 === this.depth, true);
    }
  }
  get open(): string {
    return this._open;
  }
  @Input() depth: number;
  @Output() selected = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
    if (this.open) {
      const pathArray = this.open.split('/');
      this.select(pathArray[this.depth], pathArray.length - 1 === this.depth, true);
    }
  }

  select(path: string, emit: boolean, force = false): void {
    const index = this.node.items.findIndex(item => item.name === path);
    if (index === -1) {
      return;
    }
    const selectedItem = this.node.items[index];
    if (selectedItem instanceof Folder) {
      const i = this.opened.indexOf(selectedItem.name);

      if (i !== -1 && !force) {
        this.opened.splice(i, 1);
      } else if (i === -1) {
        this.opened.push(selectedItem.name);
      }
    }
    if (emit) {
      this.selected.emit(path);
    }
  }

  childSelected(path: string, parent: string): void {
    this.selected.emit(`${parent}/${path}`);
  }

  isOpened(name: string): boolean {
    return this.opened.includes(name);
  }

}
