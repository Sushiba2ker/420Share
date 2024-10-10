import { Alert, AlertDescription } from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import ShareLinkToolbar from "./ShareLinkToolbar";

interface ShareLinkAlertProps {
  className?: string;
}

export default function ShareLinkAlert({ className }: ShareLinkAlertProps) {
  return (
    <Alert className={cn("", className)}>
      <AlertDescription>
        <p className="prose prose-invert mb-2 text-sm">
        Chia sẻ liên kết này tới các thiết bị mà bạn muốn chia sẻ tệp
        </p>
        <ShareLinkToolbar />
      </AlertDescription>
    </Alert>
  );
}
