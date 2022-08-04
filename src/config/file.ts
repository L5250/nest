/*
 * @Author: L5250
 * @Description: desc
 * @Date: 2022-07-28 16:09:37
 * @LastEditors: L5250
 * @LastEditTime: 2022-08-04 14:59:00
 */
import { join } from 'path';
import { diskStorage } from 'multer';

// export default {
//   root: join(__dirname, '../uploads'),
//   storage: diskStorage({
//     destination: join(
//       __dirname,
//       `../uploads/${new Date().toLocaleDateString()}`,
//     ),
//     filename: (req, file, cb) => {
//       const filename = `${new Date().getTime()}.${file.mimetype.split('/')[1]}`;
//       return cb(null, filename);
//     },
//   }),
// };
export default () => ({
  file: {
    // dest: './upload',
    storage: diskStorage({
      // destination: join(
      //   __dirname,
      //   `../uploads/${new Date().toLocaleDateString()}`,
      // ),
      //文件储存位置
      destination: `uploads`,
      filename: (req, file, cb) => {
        const filename = `${new Date().getTime()}.${
          file.mimetype.split('/')[1]
        }`;
        return cb(null, filename);
      },
    }),
  },
});
