import { Article } from '@/interfaces/articles.interface';

import { Schema, Document, model } from 'mongoose';

const articleSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
    },
    link: {
      type: String,
      required: [true, 'Link is required'],
      unique: true,
    },
    pubDate: {
      type: Date,
      required: [true, 'Date is required'],
    },
    guid: {
      type: String,
      required: [true, 'Guid is required'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    enclosureUrl: {
      type: String,
      nullable: true,
    },
    enclosureType: {
      type: String,
      nullable: true,
    },
  },
  { versionKey: false, timestamps: true }, //automatic adds createdAt and updatedAt fields
);

const articleModel = model<Article & Document>('Articles', articleSchema);

export default articleModel;
