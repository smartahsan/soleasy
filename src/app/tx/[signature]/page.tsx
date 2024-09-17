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
import { timeAgo } from "@/util/TimeAgo";
import FromTo from "@/components/FromTo";
import TransactionData from "@/components/TransactionData";
import type { Viewport } from 'next'
import Image from "next/image";
import SolanaGray from '../../../images/solana-gray.png';
import Snapshot from "@/components/Snapshot";

export const viewport: Viewport = {
  width: 'device-width',
  userScalable: true,
}

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
    const response = await fetch(`/getTransaction/${signature}`, {cache: "no-store",});
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
    const blockResponse = await fetch("/getBlockNumber", {cache: "no-store",});
    if (!blockResponse.ok) {
      throw new Error(`HTTP error! Status: ${blockResponse.status}`);
    }
    const { blockNumber: currentBlockNumber } = await blockResponse.json();
    const isFinalized = currentBlockNumber - data.blockNumber >= 31;

    return (
      <div className="flex justify-center items-center">
        <div className="mt-24">
          <div className="flex items-center flex-col bg-white md:w-[525px] md:h-[475px] " id="snapshot">
            {!isFinalized && <AutoRefresh />}
            <img
              className="h-16"
              src="https://i.imgur.com/eB0hIQX.png"
              alt="Logo"
            />
            <Card className="sm:w-[330px] md:w-[500px] lg:w-[500px] shadow-xl mt-5">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <h2 className="text-3xl font-bold tracking-tigh">
                  {data.amount} {data.tokenName}
                </h2>
              <Snapshot />
              </CardHeader>
              <Separator />
              <FromTo data={data} fromName={fromName} toName={toName}/>
              <Separator className="-mt-6" />
              <TransactionData data={data}/>
              <CardFooter className="flex items-center justify-between text-sm pb-2">
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
            <div className="sm:text-xs md:text-base sm:w-[280px] md:w-[450px] lg:w-[450px] flex mt-10 flex-row items-center justify-between">
              <span className="flex flex-row text-gray-500 items-center">
                <Image
                  className="sm:w-3 sm:h-3 md:w-4 md:h-4 mr-1 mb-0.5"
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
          </div>
          </div>
    );
  } catch (error) {
    console.error("Error:", error);
    return <p>Failed to load transaction. Please try again later.</p>;
  }
}
