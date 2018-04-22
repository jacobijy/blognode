import { readFile, writeFile, unlink } from "fs";
import { getFilebyMd5, saveFileToDb } from "../proxy/attachment";
import { config } from "../../config";
import { createHash } from "crypto";
import * as article from "../proxy/article";

function getArticleList(req, res, next) {
  let authod_id = req.authod_id;
  article.getArticlesByAuthorId(authod_id, (err, result) => {
    if (err) throw err;
    res.json(result);
  })
}

function onOpenEditor(req, res, next) {
  let article_id = req.body.article_id;
  article.getArtileByArticleid(article_id, (err, result) => {
    if (err) throw err;
    console.log(result);
    if (result == null)
      res.send({ status: 0 });
    else
      res.json({ article: result.maintext, figure: result.images });
  })
}

function uploadImage(req, res, next) {
  let files = req.files;
  let message = req.body;
  // console.log(req.files);  // 上传的文件信息
  var des_file = config.tmpFileDir + files[0].originalname;
  let tmpfile = config.tmpFileDir + req.files[0].filename;
  readFile(files[0].path, (err, data) => {
    console.log('readfile', data)
    let md5sum = createHash('md5').update(data);
    let md5 = md5sum.digest('hex').toLowerCase();
    getFilebyMd5(md5, (err, attachment) => {
      if (attachment != null) {
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
        saveFileToDb(response, result => {
          if (!result) {
            res.send('save error');
            return;
          }
          let srcpath = '/public/images/tmp/' + response.filename;
          // res.sendFile(join(__dirname, '../../views/index.html'))
          res.json({ path: srcpath });
        })
      })
    })
  });
}

function newArticle(req, res, next) {
  console.log(req.body);
  console.log(req.files)
  let articleInfo = {

  }
  article.newAndSave(articleInfo, (err, result) => {

  })
}

function saveArticle(req, res, next) {
  let article_id = req.body.article_id;
  let maintext = req.body.maintext;
  let images = req.body.images;
  article.updateArtileByAritcleid(article_id, article, images, (err, doc, result) => {
    if (err) throw err;
    res.send({});
  })
}

export { uploadImage, newArticle, saveArticle, onOpenEditor };