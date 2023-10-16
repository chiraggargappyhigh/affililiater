interface Transaction {
  _id: string;
  app: string;
  user_id: string;
  promotion_code: string;
  saleAmount: number;
  salesCurrency: string;
  saleDate: Date;
  commission?: {
    inCurrency: number;
    inUSD: number;
  };
}

export { Transaction };
