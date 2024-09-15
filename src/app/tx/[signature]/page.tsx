import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Copy, ExternalLink, ArrowRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Transaction } from "@/types";
import AutoRefresh from "@/components/AutoRefresh";

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
    let response = await fetch(
      `http://localhost:8080/getTransaction/${signature}`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    let data: Transaction = await response.json();

    // Fetch possible solana name service names
    let snsResponse = await fetch(
      `https://sns-api.bonfida.com/v2/user/domains/${data.from},${data.to}`,
      {
        cache: "no-store",
      }
    );

    if (!snsResponse.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    let snsData = await snsResponse.json();

    fromName =
      snsData[data.from] && snsData[data.from][0]
        ? snsData[data.from][0]
        : null;
    toName =
      snsData[data.to] && snsData[data.to][0] ? snsData[data.to][0] : null;

    // Fetch the current block number
    let blockResponse = await fetch("http://localhost:8080/getBlockNumber", {
      cache: "no-store",
    });

    if (!blockResponse.ok) {
      throw new Error(`HTTP error! Status: ${blockResponse.status}`);
    }

    let { blockNumber: currentBlockNumber } = await blockResponse.json();

    const isFinalized = currentBlockNumber - data.blockNumber >= 31;

    function timeAgo(unixTimestamp: number): string {
      const now = Date.now() / 1000;
      const diffInSeconds = Math.floor(now - unixTimestamp);

      const seconds = diffInSeconds;
      const minutes = Math.floor(diffInSeconds / 60);
      const hours = Math.floor(diffInSeconds / 3600);
      const days = Math.floor(diffInSeconds / 86400);

      if (days > 0) {
        return `Sent ${days} day${days > 1 ? "s" : ""} ago`;
      } else if (hours > 0) {
        return `Sent ${hours} hour${hours > 1 ? "s" : ""} ago`;
      } else if (minutes > 0) {
        return `Sent ${minutes} minute${minutes > 1 ? "s" : ""} ago`;
      } else {
        return `Sent ${seconds} second${seconds !== 1 ? "s" : ""} ago`;
      }
    }

    return (
      <div className="flex items-center h-screen flex-col">
        {!isFinalized && <AutoRefresh />}
        <img
          className="h-16 mt-24"
          src="https://i.imgur.com/eB0hIQX.png"
          alt="Logo"
        />
        <Card className="w-[500px] shadow-xl mt-5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h2 className="text-3xl font-bold tracking-tigh">
              {data.amount} {data.tokenName}
            </h2>
            <Button variant="ghost" size="icon">
              <Copy className="h-4 w-4" />
            </Button>
          </CardHeader>
          <Separator />
          <CardContent className="mt-3">
            <div className="flex justify-between items-center mb-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground font-bold text-gray-600">
                  FROM
                </p>
                <div className="flex items-center space-x-2">
                  <Avatar className="h-14 w-14 items-center justify-center border border-grey">
                    <AvatarImage
                      className="h-10 w-10"
                      src={`https://api.dicebear.com/9.x/identicon/svg?seed=${data.from}`}
                    />
                    <AvatarFallback>SE</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-md font-bold leading-none">
                      {fromName !== null ? fromName : "Anon"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {`${data.from.slice(0, 6)}...${data.from.slice(-6)}`}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center h-8 w-8 rounded-full border border-grey mt-4">
                <ArrowRight className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground font-bold text-gray-600">
                  TO
                </p>
                <div className="flex items-center space-x-2">
                  <Avatar className="h-14 w-14 items-center justify-center border border-grey">
                    <AvatarImage
                      className="h-10 w-10"
                      src={`https://api.dicebear.com/9.x/identicon/svg?seed=${data.to}`}
                    />
                    <AvatarFallback>A</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-md font-bold leading-none">
                      {toName !== null ? toName : "Anon"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {`${data.to.slice(0, 6)}...${data.to.slice(-6)}`}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <Separator className="-mt-6" />
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
          <CardFooter className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-1">
              <p>{timeAgo(data.blockTime)}</p>
              <ExternalLink className="h-4 w-4 text-muted-foreground" />
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
            <img
              className="w-4 h-4 mr-1 mb-0.5"
              src="https://i.imgur.com/U69TcrN.png"
              alt="Solana Logo"
            />
            Powered By <p className="ml-1 font-bold">Solana</p>
          </span>
          <span className="flex flex-row text-gray-500">
            ❤ Built by <p className="ml-1 font-bold">Anhbro</p>
          </span>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error:", error);
    return <p>Failed to load transaction. Please try again later.</p>;
  }
}
