import mongoose, { Schema } from "mongoose";
import GridFs from "gridfs-stream";

GridFs.mongo = mongoose.mongo;

var attachmentSchema = new Schema({
  length: { type: Number },
  chunkSize: { type: Number },
  uploadDate: { type: Date },
  md5: { type: String },
  filename: { type: String },
  contentType: { type: String },
  aliases: [{ type: String }],
  metadata: { type: Schema.Types.Mixed }
}, { collection: "fs.files", versionKey: "" });

attachmentSchema.index({ filename: 1 });
attachmentSchema.index({ article_id: -1 });
attachmentSchema.index({ md5: 1 });

mongoose.model('Attachment', attachmentSchema);