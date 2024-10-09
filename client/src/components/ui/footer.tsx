import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className }) => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn("bg-gray-900 text-gray-400 py-4", className)}
    >
      <div className="container mx-auto flex justify-center">
        <p>420: Embrace the moment, freedom, and peace.</p>
      </div>
    </motion.footer>
  );
};

export default Footer;