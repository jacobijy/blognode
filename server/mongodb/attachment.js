// import mongoose from "mongoose";
// import { Grid } from "gridfs-stream";
// import { createReadStream } from "fs";
// import { config } from "../../config";

/**
 * length: {type: Number},
 * chunkSize: { type: Number},
 * uploadDate: {type: Date},
 * md5: {type: String},
 * filename: {type: String},
 * contentType: {type: String},
 * aliases: [{type: String}],
 * metadata: {type: Mixed}
 */

// const gridfs = new Grid();

// mongoose.connect(config.mongodb_conf, {}, (err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     let gridfs = require('mongoose-gridfs')({
//       collection: 'attachments',
//       model: 'Attachment'
//     })
//     let AttachmentSchema = gridfs.schema;
//     mongoose.model('Attachment', AttachmentSchema);
//   }
// });