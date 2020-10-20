import { Folder } from '../models/folder';
import {File} from '../models/file';

export const files = new Folder(
  'root',
  [
    new Folder(
      'images',
      [
        new Folder(
          'animals',
          [
            new File('dog.jpg'),
            new File('cat.jpg'),
            new File('wolf.png')
          ]
        ),
        new Folder(
          'vacation',
          [
            new Folder(
              'London',
              [
                new File('0001.png'),
                new File('0002.png'),
                new File('0003.png'),
                new File('0004.png'),
                new File('0005.png'),
                new File('0006.png'),
                new File('0007.png'),
                new File('0008.png')
              ]
            ),
            new Folder(
              'Paris',
              [
                new File('0009.png'),
                new File('0010.png'),
                new File('0011.png'),
                new File('0012.png'),
                new File('0013.png'),
              ]
            ),
            new Folder(
              'New York',
              [
                new File('0014.png'),
                new File('0015.png'),
                new File('0016.png'),
                new File('0017.png'),
              ]
            )
          ]
        )
      ]
    ),
    new Folder(
      'music',
      [
        new File('Юрий Шатунов - Белые розы.mp3'),
        new File('Юрий Шатунов - Детство.mp3'),
        new File('Юрий Шатунов - Седая ночь.mp3')
      ]
    ),
    new Folder('friends', []),
    new File('note.txt'),
    new File('Диплом.doc')
  ]
);
