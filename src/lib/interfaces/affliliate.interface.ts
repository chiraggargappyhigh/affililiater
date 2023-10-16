import { User } from ".";

interface Affiliate {
  _id: string;
  user: User | string;
  app: {
    id: string;
    name: string;
    description: string;
    logo?: string;
  };
  earnings: number;
  referrals: number;
  sales: number;
}

export { Affiliate };
