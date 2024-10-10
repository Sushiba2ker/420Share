import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { QrCode } from "lucide-react";
import QRCode from "react-qr-code";
import { motion } from "framer-motion";

interface QRCodeDialogProps {
  link: string;
}

export default function QRCodeDialog({ link }: QRCodeDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
            <QrCode className="h-4 w-4" />
            <span className="ml-2">Hiển thị QR Code</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-gradient-to-br from-gray-900 to-gray-800 text-white border-none max-w-md w-full rounded-lg p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center space-y-4"
        >
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Room QR Code</DialogTitle>
            <DialogDescription className="prose prose-invert text-sm">
              Quét mã QR để tham gia phòng này.
            </DialogDescription>
          </DialogHeader>
          <div className="bg-white p-4 rounded-md">
            <QRCode value={link} size={256} />
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}