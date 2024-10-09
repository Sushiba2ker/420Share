import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn("bg-gray-900 text-white py-4 shadow-md", className)}
    >
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link to="/" className="text-2xl font-bold">
          420Share
        </Link>
        <Button asChild>
          <Link to="/settings" className="flex items-center">
            Settings
          </Link>
        </Button>
      </div>
    </motion.header>
  );
};

export default Header;