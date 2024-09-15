export interface Transaction {
    amount: number;
    blockNumber: number;
    from: string;
    to: string;
    tokenName: string;
    transactionStatus: boolean;
    type: string;
  }