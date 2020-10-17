import { Folder } from '../models/folder';

export const files: Folder = {
  name: 'root',
  items: [
    {
      name: 'images',
      items: [
        {
          name: 'animals',
          items: [
            { name: 'dog.jpg' },
            { name: 'cat.jpg' },
            { name: 'wolf.png' }
          ]
        },
        {
          name: 'vacation',
          items: [
            {
              name: 'London',
              items: [
                { name: '0001.png' },
                { name: '0002.png' },
                { name: '0003.png' },
                { name: '0004.png' },
                { name: '0005.png' },
                { name: '0006.png' },
                { name: '0007.png' },
                { name: '0008.png' },
              ]
            },
            {
              name: 'Paris',
              items: [
                { name: '0009.png' },
                { name: '0010.png' },
                { name: '0011.png' },
                { name: '0012.png' },
                { name: '0013.png' }
              ]
            },
            {
              name: 'New York',
              items: [
                { name: '0014.png' },
                { name: '0015.png' },
                { name: '0016.png' },
                { name: '0017.png' },
              ]
            }
          ]
        }
      ]
    },
    {
      name: 'music',
      items: [
        { name: 'Юрий Шатунов - Белые розы.mp3' },
        { name: 'Юрий Шатунов - Детство.mp3' },
        { name: 'Юрий Шатунов - Седая ночь.mp3' }
      ]
    },
    {
      name: 'friends',
      items: []
    },
    { name: 'note.txt' },
    { name: 'Диплом.doc'}
  ]
};
