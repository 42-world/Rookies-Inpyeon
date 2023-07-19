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

export interface LetterShort {
  id: number;
  writer: string;
  createdAt: string;
  hasPassword: boolean;
}
