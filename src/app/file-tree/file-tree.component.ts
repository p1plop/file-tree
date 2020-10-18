import {Component, EventEmitter, OnInit, ChangeDetectorRef, AfterViewInit, OnDestroy} from '@angular/core';
import { Folder } from '../../models/folder';
import {File} from '../../models/file';
import { files } from '../files';
import {ActivatedRoute, Router} from '@angular/router';
import {Subject, Subscription} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-file-tree',
  templateUrl: './file-tree.component.html',
  styleUrls: ['./file-tree.component.scss']
})
export class FileTreeComponent implements OnInit, AfterViewInit, OnDestroy {
  files: Folder = files;
  filteredFiles: Folder = Object.assign({}, this.files);
  viewedItem: Folder | File;
  openPath = new EventEmitter<string>();
  searchInput = new Subject();
  searchSubscription: Subscription

  constructor(private router: Router, private route: ActivatedRoute, private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.searchSubscription = this.searchInput.pipe(
      debounceTime(1000)
    ).subscribe((term: string) => {
      const itemsClone = JSON.parse(JSON.stringify(files.items));
      this.filteredFiles.items = this.filterFiles(term.toLowerCase(), itemsClone);
    });
  }

  ngAfterViewInit(): void {
    const url = this.router.url.substring(1);
    if (url) {
      this.openPath.emit(decodeURI(url));
      this.cdRef.detectChanges();
    }
  }

  searchChange(value: string): void {
    this.searchInput.next(value);
  }

  viewByPath(path: string): void {
    const arr  = path.split('/').filter(item => item);
    let area = this.files.items;
    for (let i = 0; i < arr.length - 1; i++) {
      const currentItem = area.find(item => item.name === arr[i]);
      if ('items' in currentItem && currentItem.items) {
        area = currentItem.items;
      }
    }

    this.viewedItem = area.find(item => item.name === arr[arr.length - 1]);
    this.router.navigateByUrl(path);
  }

  private filterFiles(term: string, items: (File | Folder)[]): (File | Folder)[] {
    if (!term) {
      return files.items;
    }

    return items.filter(item => {
      if ('items' in item && item.items && !item.name.toLowerCase().includes(term)) {
        item.items = this.filterFiles(term, item.items);
        return item.items.length;
      } else {
        return item.name.toLowerCase().includes(term);
      }
    });
  }

  ngOnDestroy() {
    this.searchSubscription.unsubscribe();
  }
}
