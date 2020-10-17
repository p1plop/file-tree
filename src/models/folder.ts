import { File } from './file';

export interface Folder {
  name: string;

  items: (File | Folder)[];
}
