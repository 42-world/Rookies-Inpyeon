export interface Letter {
  id: number;
  linkId: number;
  title: string;
  content: string;
  writer: string;
  isSent: boolean;
  password: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}
