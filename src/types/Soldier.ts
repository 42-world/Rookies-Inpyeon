export interface Soldier {
  id: number;
  name: string;
  nickname: string;
  campId?: string;
  soldierType: string;
  soldierClass: string;
  troopName: string;
  birth: string;
  enterDate: string;
  registerUserId: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
