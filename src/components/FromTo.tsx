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
        <CardContent className="mt-3 md:px-6 sm:px-4">
        <div className="flex justify-between items-center mb-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground font-bold text-gray-600">
              FROM
            </p>
            <div className="flex items-center space-x-2">
              <Avatar className="md:h-14 lg:h-14 sm:h-10 md:w-14 lg:w-14 sm:w-10 items-center justify-center border border-grey">
                <AvatarImage
                  className="md:h-8 sm:h-6 md:w-8 sm:w-6"
                  src={`https://api.dicebear.com/9.x/identicon/svg?seed=${data.from}`}
                />
                <AvatarFallback>SE</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-md font-bold leading-none">
                  {fromName !== null ? fromName : "Anon"}
                </p>
                <p className="md:text-sm sm:text-[10px] text-muted-foreground">
                  {`${data.from.slice(0, 6)}...${data.from.slice(-6)}`}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center md:h-8 md:w-8 sm:h-4 sm:w-4 rounded-full border border-grey mt-4">
            <ArrowRight className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground font-bold text-gray-600">
              TO
            </p>
            <div className="flex items-center space-x-2">
              <Avatar className="md:h-14 lg:h-14 sm:h-10 md:w-14 lg:w-14 sm:w-10 items-center justify-center border border-grey">
                <AvatarImage
                  className="md:h-8 sm:h-6 md:w-8 sm:w-6"
                  src={`https://api.dicebear.com/9.x/identicon/svg?seed=${data.to}`}
                />
                <AvatarFallback>A</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-md font-bold leading-none">
                  {toName !== null ? toName : "Anon"}
                </p>
                <p className="md:text-sm sm:text-[10px] text-muted-foreground">
                  {`${data.to.slice(0, 6)}...${data.to.slice(-6)}`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    );
}