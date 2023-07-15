export interface Letter {
  content: string;
  createdAt: string;
  deletedAt?: string;
  id: number;
  isSent: boolean;
  linkId: number;
  password: string;
  title: string;
  updatedAt: string;
  writer: string;
}
