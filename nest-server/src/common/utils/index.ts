import { promisify } from 'util';
import { unlink, constants, access } from 'fs';

export async function fileExists(path: string): Promise<boolean> {
  try {
    await promisify(access)(path, constants.F_OK);
    return true;
  } catch (err) {
    return false;
  }
}

export async function deleteFile(path: string) {
  try {
    if (path !== '') {
      const exits = await fileExists(path);
      exits && (await promisify(unlink)(path));
    }
  } catch (err) {
    console.info(err);
  }
}
