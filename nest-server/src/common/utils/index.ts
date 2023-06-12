import { promisify } from 'util';
import { unlink } from 'fs';

export function deleteFile(path: string) {
  try {
    if (path !== '') {
      promisify(unlink)(path);
    }
  } catch (err) {
    console.info(err);
  }
}
