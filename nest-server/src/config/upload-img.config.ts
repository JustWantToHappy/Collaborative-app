import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import * as iconv from 'iconv-lite';

const generateUniqueFileName = (originalName: string) => {
  //防止乱码
  const fileName = iconv.decode(Buffer.from(originalName, 'binary'), 'utf-8');
  return `${uuidv4()}-${fileName}`;
};

export const multerOptions = {
  storage: diskStorage({
    destination: './public/images',
    filename(req, file, callback) {
      const uniqueFileName = generateUniqueFileName(file.originalname);
      callback(null, uniqueFileName);
    },
  }),
  encoding: 'binary', // 设置编码格式为 binary
  // preservePath: true, // 如果需要保留原始路径和名称，请取消注释此行
};
