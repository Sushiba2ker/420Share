import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import ShareLinkToolbar from "./ShareLinkToolbar";
import { motion } from "framer-motion";

export function ShareLinkDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className={
            "prose flex gap-3 items-center p-6 transition-transform duration-500 opacity-100 scale-105 hover:scale-110"
          }
        >
          <Share2 className="h-5 w-5" />
          <span className="hidden sm:inline">Share Link</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-gradient-to-br from-gray-900 to-gray-800 text-white border-none max-w-md w-full rounded-lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold mb-2">Share Room Link</DialogTitle>
            <DialogDescription className="prose prose-invert mb-4 text-sm">
              Share this link to devices you want to share files with
            </DialogDescription>
          </DialogHeader>
          <ShareLinkToolbar />
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}