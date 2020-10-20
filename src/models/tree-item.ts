import {File} from './file';
import {Folder} from './folder';

export interface TreeItem {
  name: string;

  items?: (File | Folder)[];
}
