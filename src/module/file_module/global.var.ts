import * as os from 'os';
import * as mkdirp from 'mkdirp';
import * as crypto from 'crypto';
import * as path from 'path';
import * as fs from 'fs';
import * as FileType from 'file-type';
import * as md5File from 'md5-file';
function getDestination(req, file, cb) {
  cb(null, os.tmpdir());
}
function getFilename(req, file, cb) {
  crypto.randomBytes(16, function (err, raw) {
    cb(err, err ? undefined : raw.toString('hex'));
  });
}
export class CustomDiskStorage {
  getDestination: any;
  getFilename: any;
  constructor(opts) {
    this.getFilename = opts.filename || getFilename;
    if (typeof opts.destination === 'string') {
      mkdirp.sync(opts.destination);
      this.getDestination = function ($0, $1, cb) {
        cb(null, opts.destination);
      };
    } else {
      this.getDestination = opts.destination || getDestination;
    }
  }
  _handleFile(req, file, cb) {
    this.getDestination(req, file, (err, destination) => {
      if (err) return cb(err);
      this.getFilename(req, file, async (err, filename) => {
        if (err) return cb(err);

        const stream = await FileType.stream(file.stream);
        const finalPath = path.join(
          destination,
          filename +
            `${
              (stream.fileType.ext as string) === ''
                ? ''
                : '.' + stream.fileType.ext
            }`,
        );
        const outStream = fs.createWriteStream(finalPath);
        stream.pipe(outStream);

        outStream.on('error', cb);
        outStream.on('finish', async function () {
          //计算MD5的值，之后返回
          const md5 = await md5File(finalPath);
          cb(null, {
            destination: destination,
            filename: filename,
            path: finalPath,
            size: outStream.bytesWritten,
            real_ext: stream.fileType.ext || '',
            md5: md5,
          });
        });
      });
    });
  }
  _removeFile(req, file, cb) {
    const path = file.path;
    delete file.destination;
    delete file.filename;
    delete file.path;
    fs.unlink(path, cb);
  }
}
export const FILE_MODULE_PARAM = 'FILE_MODULE_PARAM';
export const FILE_MODULE_INIT = 'FILE_MODULE_INIT';
