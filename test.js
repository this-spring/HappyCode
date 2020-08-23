/*
 * @Author: xiuquanxu
 * @Company: kaochong
 * @Date: 2020-07-06 18:41:13
 * @LastEditors: xiuquanxu
 * @LastEditTime: 2020-08-10 10:12:28
*/
const compressing = require('compressing');

const TAG = 'ProcessTask';

const CmdType = {
  CompressZip: 'CompressZip',
  UnZip: 'UnZip',
};
window.console
const obj = {
    x: 'x',
    co: function x() {
      
    }
};
let arr = [];
console.log(arr);
console.log(obj);

process.on('message', (res) => {
  console.log(TAG, ' receive message:', JSON.stringify(res), typeof res);
  const cmd = res.cmd;
  const payload = res.payload;
  if (cmd == CmdType.CompressZip) {
    const zipUrl = `${payload.loggerUrl}.zip`;
    console.log(TAG, ' loggerUrl:', payload.loggerUrl, ' zipUrl:', zipUrl);
    compressing.zip.compressDir(payload.loggerUrl, zipUrl).then(() => {
      console.log(TAG, ' compress success & rm logger dir');
      removeDir(payload.loggerUrl);
      uploadOSS(zipUrl, payload.uploadZipUrl, payload.reportUrl, (state) => {
        if (state) {
          console.log(TAG, ' upload oss success');
          removeFile(zipUrl);
        } else {
          console.log(TAG, ' upload oss fail');
        }
        process.exit(0);
      });
    });
  }
});

const removeDir = function(paths) {
  let files = [];
  if (fs.existsSync(paths)){
    files = fs.readdirSync(paths);
    files.forEach((file, index) => {
      let curPath = paths + "/" + file;
      if(fs.statSync(curPath).isDirectory()){
          removeDir(curPath); //递归删除文件夹
      } else {
          removeFile(curPath); //删除文件
      }
    });
    fs.rmdirSync(paths);
  }
}


const removeFile = function(paths) {
  fs.unlinkSync(paths);
}

var x = 1000;

uploadOSS = function(logUrl, uploadUrl, reportUrl, callback) {
  console.log(TAG, ' uploadOSS: logUrl:', logUrl, ' uploadUrl:', uploadUrl, ' reportUrl:', reportUrl);
  try {
      const blob = fs.createReadStream(logUrl, {
          autoClose: true,
      });
      const upload = request.post(reportUrl, (error, data) => {
          if (!error && JSON.parse(data.body).results.code === 0) {
              callback(true);
          } else {
              console.log(TAG, 'upload failed code', JSON.stringify(JSON.parse(data.body).results.code), 'error: ', JSON.stringify(error));
              callback(false);
          }
      });
      const form = upload.form();
      form.append('path', uploadUrl);
      form.append('upload_file_minidump', blob);
      form.append('filetype', 'logger');
  } catch (e) {
      console.log(TAG, 'upload failed error: ', JSON.stringify(e));
      callback(false);
  }
}