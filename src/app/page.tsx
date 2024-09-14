import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { Copy, ExternalLink, ArrowRight } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
 <Card className="w-[500px]">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <h2 className="text-3xl font-bold tracking-tight">20.00 SOL</h2>
        <Button variant="ghost" size="icon">
          <Copy className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">FROM</p>
            <div className="flex items-center space-x-2">
              <Avatar className="h-14 w-14">
                <AvatarFallback>SE</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-md font-bold leading-none">SolEasy</p>
                <p className="text-sm text-muted-foreground">3Mxf8q...MjXb3M</p>
              </div>
            </div>
          </div>
          <ArrowRight className="h-5 w-5 text-muted-foreground" />
          <div className="space-y-1 text-right">
            <p className="text-sm text-muted-foreground">TO</p>
            <div className="flex items-center space-x-2">
              <div>
                <p className="text-md font-bold leading-none">anhbro</p>
                <p className="text-sm text-muted-foreground">3Mxf8q...Mjlk3M</p>
              </div>
              <Avatar className="h-14 w-14">
                <AvatarFallback>A</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between text-sm">
          <div className="flex items-center space-x-1">
            <p>Sent 1 days ago</p>
            <ExternalLink className="h-4 w-4 text-muted-foreground" />
          </div>
          <p className="text-green-500 font-medium">✓ Finalized</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">

      </CardFooter>
    </Card>
  </div>
  );
}
