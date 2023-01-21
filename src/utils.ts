import Resizer from 'react-image-file-resizer';

export const resizeFile = (file: any, maxWidth: number, maxWeight: number) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      maxWidth,
      maxWeight,
      'JPEG',
      90,
      0,
      (uri) => {
        resolve(uri);
      },
      'file'
    );
  });
