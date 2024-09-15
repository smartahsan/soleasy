import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { Copy, ExternalLink, ArrowRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
export default function Home() {

  return (
    <div className="flex items-center h-screen flex-col">
      <img className="h-16 mt-24" src="https://i.imgur.com/eB0hIQX.png"/>
      <Card className="w-[500px] shadow-xl mt-5">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <h2 className="text-3xl font-bold tracking-tigh">
            20.00 SOL
          </h2>
          <Button variant="ghost" size="icon">
            <Copy className="h-4 w-4" />
          </Button>
        </CardHeader>
        <Separator />
        <CardContent className="mt-3">
          <div className="flex justify-between items-center mb-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground font-bold text-gray-600">FROM</p>
              <div className="flex items-center space-x-2">
                <Avatar className="h-14 w-14 items-center justify-center border border-grey">
                  <AvatarImage className="h-10 w-10" src="https://api.dicebear.com/9.x/identicon/svg?seed=PDeTRf1gaHUVESirEYmRKREGpUqotnjzk5PqLzHGyGh"/>
                  <AvatarFallback>SE</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-md font-bold leading-none">SolEasy</p>
                  <p className="text-sm text-muted-foreground">
                    3Mxf8q...MjXb3M
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center h-8 w-8 rounded-full border border-grey mt-4">
              <ArrowRight className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground font-bold text-gray-600">TO</p>
              <div className="flex items-center space-x-2">
              <Avatar className="h-14 w-14 items-center justify-center border border-grey">
                  <AvatarImage className="h-10 w-10" src="https://api.dicebear.com/9.x/identicon/svg?seed=GjRki8CHtv8xxTJHGhGH8RM1FxoATC5H6gDxF5k3Z4Ap"/>
                  <AvatarFallback>A</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-md font-bold leading-none">anhbro</p>
                  <p className="text-sm text-muted-foreground">
                    3Mxf8q...Mjlk3M
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <Separator className="-mt-6"/>
        <CardContent className="mt-3">
          <div className="flex flex-row justify-between">
            <div>
              <p className="text-xs text-muted-foreground font-bold text-gray-500">CHAIN</p>
              <p className="mt-1 text-sm font-bold text-gray-600">Solana</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-bold text-gray-500">BLOCK</p>
              <p className="mt-1 text-sm font-bold text-gray-600">274437259</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-bold text-gray-500">TYPE</p>
              <p className="mt-1 text-sm font-bold text-gray-600">Transfer</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-bold text-gray-500">RESULT</p>
              <p className="mt-1 text-sm font-bold text-gray-600">Success</p>
            </div>
          </div>

        </CardContent>
        <CardFooter className=" flex items-center justify-between text-sm">
            <div className="flex items-center space-x-1">
              <p>Sent 1 days ago</p>
              <ExternalLink className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="text-green-500 font-medium">✓ Finalized</p>
        </CardFooter>
      </Card>
      <div className="w-[450px] flex mt-10 flex-row items-center justify-between">
        <p className="flex flex-row text-gray-500 items-center" > <img className="w-4 h-4 mr-1 mb-0.5" src="https://i.imgur.com/U69TcrN.png"/>Powered By <p className="ml-1 font-bold">Solana</p></p>
        <p className="flex flex-row text-gray-500">❤ Built by <p className="ml-1 font-bold">Anhbro</p></p>
      </div>
    </div>
  );
}
