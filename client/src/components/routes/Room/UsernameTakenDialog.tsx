import { useNavigate } from 'react-router-dom';
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
import { UserX, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface UsernameTakenDialogProps {
  open: boolean;
  username: string;
  roomId: string;
}

export default function UsernameTakenDialog({
  open,
  username,
  roomId,
}: UsernameTakenDialogProps) {
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate('/');
  };

  const handleContinue = () => {
    navigate(`/settings?roomId=${roomId}`);
  };

  return (
    <AlertDialog open={open}>
      <AlertDialogContent className="bg-gradient-to-br from-gray-900 to-gray-800 text-white border-none max-w-md w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <AlertDialogHeader>
            <AlertDialogTitle className="text-3xl font-bold mb-4 flex items-center">
              <UserX className="h-8 w-8 text-red-400 mr-2" />
              Username Taken
            </AlertDialogTitle>
            <AlertDialogDescription className="text-xl text-gray-300">
              Someone with the username <span className="font-semibold text-blue-400">{username}</span> is already present in the room.
              Do you want to change your username?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg filter blur-xl opacity-30"></div>
              <div className="relative bg-gray-800 rounded-lg p-4 shadow-xl">
                <p className="text-gray-300 mb-2">
                  Changing your username will allow you to join the room with a different identity.
                </p>
              </div>
            </div>
          </div>
          <AlertDialogFooter className="mt-6 space-x-2">
            <AlertDialogCancel asChild>
              <Button
                onClick={handleCancel}
                className="bg-transparent text-white border-white hover:bg-white hover:text-gray-900 transition-colors"
              >
                Cancel
              </Button>
            </AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button
                onClick={handleContinue}
                className="bg-blue-500 text-white hover:bg-blue-600 transition-colors group"
              >
                Continue
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </motion.div>
      </AlertDialogContent>
    </AlertDialog>
  );
}