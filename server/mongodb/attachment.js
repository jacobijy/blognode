import mongoose, { Schema } from "mongoose";
import GridFs from "gridfs-stream";
import { config } from "../../config";

var connection = mongoose.createConnection(config.mongodb_conf);
GridFs.mongo = mongoose.mongo;

var gfs = connection.once('open', () => {
  return GridFs(connection.db)
})

var attachmentSchema = new Schema({
  length: { type: Number },
  chunkSize: { type: Number },
  uploadDate: { type: Date },
  md5: { type: String },
  filename: { type: String },
  contentType: { type: String },
  aliases: [{ type: String }],
  metadata: { type: Mixed }
}, { collection: "fs.files", versionKey: "" });

mongoose.model('Attachment', attachmentSchema);