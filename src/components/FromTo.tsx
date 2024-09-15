import { Transaction } from "@/types";
import { CardContent } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ArrowRight } from "lucide-react";

interface FromToProps {
    data: Transaction;
    fromName: string | null;
    toName: string | null;
  }

export default function FromTo({ data, fromName, toName }: FromToProps) {
    return (
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
    );
}