import {Component, Input, OnInit, Output, EventEmitter, OnDestroy} from '@angular/core';
import {Folder} from '../../../models/folder';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.scss']
})
export class FolderComponent implements OnInit, OnDestroy {
  opened: string[] = [];
  openChildPath = new EventEmitter<string>();
  openSubscription: Subscription;

  @Input() node: Folder;
  @Input() open: EventEmitter<string>;
  @Output() selected = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
    this.openSubscription = this.open.subscribe(path => {
      const pathArray = path.split('/');
      this.select(pathArray[0], true);

      pathArray.splice(0, 1);
      if (pathArray.length) {
        setTimeout(() => {
          this.openChildPath.emit(pathArray.join('/'));
        }, 0);
      }
    });
  }

  select(path: string, force = false): void {
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
    this.selected.emit(path);
  }

  childSelected(path: string, parent: string): void {
    this.selected.emit(`${parent}/${path}`);
  }

  isOpened(name: string): boolean {
    return this.opened.includes(name);
  }

  ngOnDestroy(): void {
    this.openSubscription.unsubscribe();
  }

}
