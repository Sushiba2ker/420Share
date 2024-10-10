import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface SendFileButtonProps {
  sendFile: (file: File, targetUsernames: string[]) => void;
  disabled: boolean;
  className?: string;
  peers: string[];
}

export default function SendFileButton({
  sendFile,
  disabled,
  className,
  peers,
}: SendFileButtonProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && selectedUsers.length > 0) {
      sendFile(file, selectedUsers);
      setSelectedUsers([]);
      setIsDialogOpen(false);
    }
  };

  const toggleUser = (username: string) => {
    setSelectedUsers((prev) =>
      prev.includes(username)
        ? prev.filter((user) => user !== username)
        : [...prev, username]
    );
  };

  const toggleAllUsers = () => {
    if (selectedUsers.length === peers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers([...peers]);
    }
  };

  return (
    <>
      <Input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex"
          >
            <Button
              disabled={disabled}
              className={cn(
                `prose flex gap-3 items-center p-6 transition-transform duration-500 ${
                  disabled
                    ? "opacity-50 scale-95 cursor-not-allowed"
                    : "opacity-100 scale-105 hover:scale-110"
                }`,
                className
              )}
            >
              <Plus className="h-5 w-5" />
              <span className="hidden sm:inline">Gửi Tệp</span>
            </Button>
          </motion.div>
        </DialogTrigger>
        <DialogContent className="bg-gradient-to-br from-gray-900 to-gray-800 text-white border-none max-w-md w-full rounded-lg p-6">
          <DialogHeader>
            <DialogTitle>Chọn Người Nhận</DialogTitle>
          </DialogHeader>
          <div className="mt-4 space-y-2">
            <Button onClick={toggleAllUsers} variant="outline" className="w-full mb-2">
              {selectedUsers.length === peers.length ? "Bỏ chọn tất cả" : "Chọn tất cả"}
            </Button>
            <div className="max-h-60 overflow-y-auto pr-2">
              {peers.map((peer) => (
                <div key={peer} className="flex items-center space-x-3 mb-3">
                  <Checkbox
                    id={`user-${peer}`}
                    label={peer}
                    checked={selectedUsers.includes(peer)}
                    onChange={() => toggleUser(peer)}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-4">
            <Button
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
            >
              Hủy
            </Button>
            <Button
              onClick={() => {
                fileInputRef.current?.click();
              }}
              disabled={selectedUsers.length === 0}
            >
              Chọn Tệp
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}