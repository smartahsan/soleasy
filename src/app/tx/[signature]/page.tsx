import { Button } from "@/components/ui/button";
import {
  Card,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Transaction } from "@/types";
import AutoRefresh from "@/components/AutoRefresh";
import Link from "next/link";
import TransactionData from "@/components/TransactionData";
import FromTo from "@/components/FromTo";
import { timeAgo } from "@/util/TimeAgo";
import ClipboardButton from "@/components/ClipboardButton";
import Image from "next/image";
import SolanaGray from '../../../images/solana-gray.png';
import SolEasyLogo from '../../../images/soleasy-logo.png';

export default async function Page({
  params,
}: {
  params: { signature: string };
}) {
  const { signature } = params;

  try {
    let fromName = null;
    let toName = null;

    // Fetch transaction data
    const response = await fetch(`http://localhost:8080/getTransaction/${signature}`, {cache: "no-store",});
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data: Transaction = await response.json();

    // Fetch possible solana name service names
    const snsResponse = await fetch(`https://sns-api.bonfida.com/v2/user/domains/${data.from},${data.to}`, {cache: "no-store",}); 
    if (!snsResponse.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const snsData = await snsResponse.json();

    fromName = snsData[data.from] && snsData[data.from][0] ? snsData[data.from][0] : null;
    toName = snsData[data.to] && snsData[data.to][0] ? snsData[data.to][0] : null;

    // Fetch the current block number
    const blockResponse = await fetch("http://localhost:8080/getBlockNumber", {cache: "no-store",});
    if (!blockResponse.ok) {
      throw new Error(`HTTP error! Status: ${blockResponse.status}`);
    }
    const { blockNumber: currentBlockNumber } = await blockResponse.json();
    const isFinalized = currentBlockNumber - data.blockNumber >= 31;

    return (
      <div className="flex items-center h-screen flex-col">
        {!isFinalized && <AutoRefresh />}
        <Image
          className="h-16 mt-24"
          src={SolEasyLogo}
          alt="Logo"
        />
        <Card className="w-[500px] shadow-xl mt-5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h2 className="text-3xl font-bold tracking-tigh">
              {data.amount} {data.tokenName}
            </h2>
          <ClipboardButton text={`https://www.soleasy.io/tx/${signature}`}/>
          </CardHeader>
          <Separator />
          <FromTo data={data} fromName={fromName} toName={toName}/>
          <Separator className="-mt-6" />
          <TransactionData data={data}/>
          <CardFooter className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-1">
              <p>{timeAgo(data.blockTime)}</p>
              <Link href={`https://explorer.solana.com/tx/${signature}`}>
                <Button variant="link" className="p-0">
                  <ExternalLink className="h-4 w-4 text-muted-foreground" />
                </Button>
              </Link>
            </div>
            <p
              className={`font-medium ${
                isFinalized ? "text-green-500" : "text-yellow-500"
              }`}
            >
              {isFinalized ? "✓ Finalized" : "Pending"}
            </p>
          </CardFooter>
        </Card>
        <div className="w-[450px] flex mt-10 flex-row items-center justify-between">
          <span className="flex flex-row text-gray-500 items-center">
            <Image
              className="w-4 h-4 mr-1 mb-0.5"
              src={SolanaGray}
              alt="Solana Logo"
            />
            Powered By <p className="ml-1 font-bold">Solana</p>
          </span>
          <span className="flex flex-row text-gray-500">
            ❤ Built by <p className="ml-1 font-bold">smartahsan</p>
          </span>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error:", error);
    return <p>Failed to load transaction. Please try again later.</p>;
  }
}
