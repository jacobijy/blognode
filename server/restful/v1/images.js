import * as Attachment from '../../proxy/attachment';
import { Request, Response, NextFunction } from 'express';
import { readFile, writeFile, unlink } from 'fs';
import { config } from '../../../config';
import { createHash } from 'crypto';

const images = {
    createImages: (req: Request, res: Response, next: NextFunction) => {
        let files = req.files;
    let message = req.body;
    // console.log(req.files);  // 上传的文件信息
    var des_file = config.tmpFileDir + files[0].originalname;
    let tmpfile = config.tmpFileDir + req.files[0].filename;
    readFile(files[0].path, (err, data) => {
        console.log('readfile', data)
        let md5sum = createHash('md5').update(data);
        let md5 = md5sum.digest('hex').toLowerCase();
        Attachment.getFilebyMd5(md5).then(result => {
            if (result != null) {
                unlink(tmpfile, err => {
                    if (err) console.log(err);
                })
                res.json({ path: des_file })
                return;
            }

            writeFile(des_file, data, (err) => {
                if (err) console.log(err);
                unlink(tmpfile, err => {
                    if (err) console.log(err);
                })

                let response = {
                    filename: files[0].originalname,
                    filepath: config.tmpFileDir,
                    article_id: message.article_id
                }
                Attachment.saveFileToDb(response, result => {
                    if (!result) {
                        res.send('save error');
                        return;
                    }
                    let srcpath = '/public/images/tmp/' + response.filename;
                    // res.sendFile(join(__dirname, '../../views/index.html'))
                    res.json({ path: srcpath });
                })
            })
        }).catch(err => {

        })
    });
    }
}

export default images