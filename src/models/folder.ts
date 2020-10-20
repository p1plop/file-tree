import { File } from './file';

export class Folder {
  constructor(name: string, items: (File | Folder)[]) {
    this.name = name;
    this.items = items;
  }
  name: string;

  items: (File | Folder)[];
}
