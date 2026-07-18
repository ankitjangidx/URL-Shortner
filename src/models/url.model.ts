import mongoose, { Document, Schema } from 'mongoose';

export interface SUrl extends Document {
  shortUrl: string;
  originalUrl: string;
  clicks: number;
  createdAt: Date;
  updatedAt: Date;
}

const SUrlSchema = new Schema<SUrl>({
  shortUrl: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  originalUrl: {
    type: String,
    required: true,
  },
  clicks: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

SUrlSchema.index({ createdAt: -1 });
const SUrlModel = mongoose.model<SUrl>('SUrl', SUrlSchema);
export { SUrlModel };
