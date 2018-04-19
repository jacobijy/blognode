import mongoose, { Schema } from 'mongoose';
import BaseModel from './base_model';

const ArticleSchema = new Schema({
  id: { type: Number },
  article_id: {type: Number},
  author_id: { type: Number },
  figure: { type: Array },
  maintext: { type: String },
  postdate: { type: Date, default: Date.now },
  readtime: { type: Number },
  commitsnumber: { type: Number },
  likedtime: { type: Number }
})

ArticleSchema.plugin(BaseModel);

ArticleSchema.index({ postdate: -1 });
ArticleSchema.index({ author_id: 1 }, { unique: true });

mongoose.model('Article', ArticleSchema);
