import mongoose from "mongoose";
import mongoose_gridfs from "mongoose-gridfs";
import { createReadStream } from "fs";
import { config } from "../../config";

mongoose.connect(config.mongodb_conf, {}, (err) => {
  if (err) {
    
  } else {
    let gridfs = require('mongoose-gridfs')({
      collection: 'attachments',
      model: 'Attachment'
    })
    let AttachmentSchema = gridfs.schema;
    mongoose.model('Attachment', AttachmentSchema);
  }
});