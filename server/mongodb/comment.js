import mongoose, { Schema } from 'mongoose';
import BaseModel from './base_model';

const CommentSchema = new Schema({
    id: { type: Number },
    article_id: { type: Number },
    name: { type: String, default: 'anonymous' },
    comment: { type: String },
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now }
})

CommentSchema.plugin(BaseModel);

CommentSchema.index({ "article_id": -1 }, { unique: true });
CommentSchema.index({ "author_id": 1 });

mongoose.model('Comment', CommentSchema);
