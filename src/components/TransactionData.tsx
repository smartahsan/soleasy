
import { Transaction } from "@/types";
import { CardContent } from "./ui/card";

interface TransactionDataProps {
    data: Transaction;
  }

export default function TransactionData({ data }: TransactionDataProps) {
    return (
        <CardContent className="mt-3">
        <div className="flex flex-row justify-between">
          <div>
            <p className="text-xs text-muted-foreground font-bold text-gray-500">
              CHAIN
            </p>
            <p className="mt-1 text-sm font-bold text-gray-600">Solana</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground font-bold text-gray-500">
              BLOCK
            </p>
            <p className="mt-1 text-sm font-bold text-gray-600">
              {data.blockNumber}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground font-bold text-gray-500">
              TYPE
            </p>
            <p className="mt-1 text-sm font-bold text-gray-600">
              {data.type === "spl" ? "SPL Transfer" : "Transfer"}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground font-bold text-gray-500">
              RESULT
            </p>
            <p className="mt-1 text-sm font-bold text-gray-600">
              {data.transactionStatus === true ? "Success" : "Failed"}
            </p>
          </div>
        </div>
      </CardContent>
    );
}