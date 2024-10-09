import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface DownloadDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  filename: string;
  onClickDownload: () => void;
}

export default function DownloadDialog({
  open,
  setOpen,
  filename,
  onClickDownload,
}: DownloadDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="bg-gradient-to-br from-gray-900 to-gray-800 text-white border-none max-w-md w-full rounded-lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl font-bold mb-2">Download File</AlertDialogTitle>
            <AlertDialogDescription className="prose prose-invert">
              Do you want to download <span className="font-semibold">{filename}</span>?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel asChild>
              <Button
                onClick={() => setOpen(false)}
                className="bg-transparent text-white border-white hover:bg-white hover:text-gray-900 transition-colors"
              >
                Cancel
              </Button>
            </AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button
                onClick={onClickDownload}
                className="bg-blue-500 text-white hover:bg-blue-600 transition-colors group"
              >
                Download
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </motion.div>
      </AlertDialogContent>
    </AlertDialog>
  );
}