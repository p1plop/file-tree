import {Component, EventEmitter, OnInit, AfterViewInit, OnDestroy} from '@angular/core';
import { Folder } from '../../models/folder';
import { files } from '../files';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {FormControl} from '@angular/forms';
import {TreeItem} from '../../models/tree-item';

@Component({
  selector: 'app-file-tree',
  templateUrl: './file-tree.component.html',
  styleUrls: ['./file-tree.component.scss']
})
export class FileTreeComponent implements OnInit, AfterViewInit, OnDestroy {
  files: Folder = files;
  filteredFiles: Folder;
  viewedItem: TreeItem;
  openPath = new EventEmitter<string>(true);
  searchSubscription: Subscription;
  search = new FormControl();

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.filteredFiles = new Folder('root', this.filterFiles('', files.items));

    this.searchSubscription = this.search.valueChanges.pipe(
      debounceTime(1000)
    ).subscribe((term: string) => {
      this.filteredFiles.items = this.filterFiles(term.toLowerCase(), files.items);
    });
  }

  ngAfterViewInit(): void {
    const url = this.router.url.substring(1);
    if (url) {
      this.openPath.emit(decodeURI(url));
    }
  }

  viewByPath(path: string): void {
    const arr  = path.split('/').filter(item => item);
    let area = this.files.items;
    for (let i = 0; i < arr.length - 1; i++) {
      const currentItem = area.find(item => item.name === arr[i]);
      if (currentItem instanceof Folder) {
        area = currentItem.items;
      }
    }

    this.viewedItem = area.find(item => item.name === arr[arr.length - 1]);
    this.router.navigateByUrl(path);
  }

  filterFiles(term: string, items: TreeItem[], path= ''): TreeItem[] {
    const matches = [];
    if (!items) {
      return matches;
    } else if (!term) {
      return items;
    }

    for (const item of items) {
      if (item.name.toLowerCase().includes(term)) {
        matches.push(item);
        const url = `${path}/${item.name}`.substring(1);
        if (url) {
          this.openPath.emit(decodeURI(url));
        }
      } else {
        const childResults = this.filterFiles(term, item.items, `${path}/${item.name}`);
        if (childResults.length) {
          matches.push(new Folder(item.name, childResults));
        }
      }
    }

    return matches;
  }

  ngOnDestroy(): void {
    this.searchSubscription.unsubscribe();
  }
}
