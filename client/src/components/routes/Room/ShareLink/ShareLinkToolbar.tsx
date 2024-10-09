import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, Copy } from "lucide-react";
import QRCodeDialog from "../QRCodeDialog";
import { motion } from "framer-motion";

export default function ShareLinkToolbar() {
  const [copied, setCopied] = useState(false);
  const currentLink = window.location.href;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(currentLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4"
    >
      <Input readOnly value={currentLink} className="flex-grow bg-gray-700 text-white" />
      <div className="flex space-x-2">
        <Button onClick={copyToClipboard} variant="outline">
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          <span className="ml-2">{copied ? "Copied" : "Copy"}</span>
        </Button>
        <QRCodeDialog link={currentLink} />
      </div>
    </motion.div>
  );
}