import { Loader2 }           from "lucide-react";
import { PropsWithChildren } from "react";

import { Button } from "@/components/ui/button";

interface Props extends PropsWithChildren {
    isLoading?: boolean
    type?: "button" | "submit" | "reset"
}

export default function LoadingButton({ isLoading, children, type }: Props) {
  return <Button disabled={isLoading} type={type}>
    {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
    {children}
  </Button>
}