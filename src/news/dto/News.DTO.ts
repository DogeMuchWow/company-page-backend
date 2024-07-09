import { ObjectId } from 'mongoose';

export type newsDTO = {
  title: string;
  image: string;
  summary: string;
  content: string;
  author: string;
  mode: boolean;
  tags: string[];
  categories: ObjectId[];
  views: number;
  timepublic: string;
};
