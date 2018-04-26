import mongoose, { Schema } from 'mongoose';
import BaseModel from './base_model';
import { Article } from '.';

const ArticleSchema = new Schema({
  id: { type: Number },
  article_id: { type: Number },
  author_id: { type: Schema.Types.ObjectId },
  figure: { type: Array },
  maintext: { type: String, default: "<p><br></p>" },
  postdate: { type: Date, default: Date.now },
  readtime: { type: Number, default: 0 },
  commitsnumber: { type: Number, default: 0 },
  likedtime: { type: Number, default: 0 }
})

const Conuter = mongoose.model('Counter');

ArticleSchema.plugin(BaseModel);

ArticleSchema.index({ postdate: -1 });
ArticleSchema.index({ author_id: 1 }, { unique: false });
ArticleSchema.index({ article_id: -1 }, { unique: true });
ArticleSchema.pre('save', function (next) {
  var self = this;
  Conuter.findOneAndUpdate({ _id: "entityid" }, { $inc: { seq: 1 } }, (err, counter) => {
    if (err) return next(err);
    self.article_id = counter.seq;
    next();
  })
})

mongoose.model('Article', ArticleSchema);
