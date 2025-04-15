import { ObjectId } from "mongodb";

export interface Task {
  _id: ObjectId;
  title: string;
  dateCreated: number;
  deadline?: string | null;
  inProgress?: boolean;
  completed: boolean;
  userId: string;
}

// Needs to be the same as the backend
