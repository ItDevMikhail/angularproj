import { ObjectId } from "mongoose";

export interface IBook {
  _id?: ObjectId,
  name: string;
  description: string;
  }