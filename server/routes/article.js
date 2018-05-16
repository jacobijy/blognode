import { readFile, writeFile, unlink } from "fs";
import { getFilebyMd5, saveFileToDb } from "../proxy/attachment";
import { config } from "../../config";
import { createHash } from "crypto";
import * as article from "../proxy/article";

function getArticleList(req, res, next) {
    let { authorid, articleNumber } = req.body
    console.log(req.body);
    article.getArticlesByAuthorId(authorid, articleNumber, (err, result) => {
        if (err) throw err;
        console.log(result);
        articleNumber += result.length;
        res.json({ articles: result, articleNumber });
    })
}

function onOpenEditor(req, res, next) {
    let { article_id, author_id } = req.body
    console.log(article_id, author_id);
    let promise1 = new Promise((resolve, reject) => {
        article.getArtileByArticleid(article_id, (err, result) => {
            if (err)
                reject({ status: 0 })
            else {
                const { maintext = '<p><br></p>', figure = [] } = result
                let status = result == null ? 0 : 1
                resolve({ article: maintext, figure, status })
            }
        })
    })
    let promise2 = article.getTitlesByAuthorId(author_id)
    Promise.all([promise1, promise2]).then(posts => {
        let data = Object.assign({}, posts[0], { titles: posts[1] })
        res.json(data);
    }).catch(reason => {
        console.log('fail', reason);
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
    let articleInfo = {
        maintext: req.body.maintext,
        author_id: req.body.author_id
    }
    article.newAndSave(articleInfo, (err, result) => {
        if (err) return console.log(err);
        if (result) {
            let opts = {
                maxAge: 1000 * 60 * 60 * 24 * 30,
                httpOnly: false
            };
            res.cookie('ARTICLE_EDIT', result.article_id, opts);
            res.send({ article_id: result.article_id });
        }
    })
}

function saveArticle(req, res, next) {
    let article_id = req.body.article_id;
    let maintext = req.body.article;
    let images = req.body.files;
    if (images === undefined)
        images = [];
    console.log(req.body);
    article.updateArtileByAritcleid(article_id, maintext, images, (err, doc, result) => {
        if (err) throw err;
        res.send('save succeeded');
    })
}

export { uploadImage, newArticle, saveArticle, onOpenEditor, getArticleList };