import { cn } from "@/lib/utils";
import { Handle, Position } from "@xyflow/react";
import { motion } from "framer-motion";

interface UserNodeProps {
  data: {
    label: string;
  };
}

export default function UserNode({ data }: UserNodeProps) {
  const textLength = data.label.length;
  let sizeClass = "w-16 h-16";

  if (textLength > 6 && textLength <= 16) {
    sizeClass = "w-24 h-24";
  } else if (textLength > 16) {
    sizeClass = "w-28 h-28";
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "flex items-center justify-center rounded-full bg-background border-2 border-primary shadow-lg",
        sizeClass,
      )}
    >
      <p className="text-center mb-0 text-xs">{data.label}</p>
      <Handle
        type="source"
        className="invisible"
        position={Position.Top}
        id="a"
      />
      <Handle
        type="source"
        className="invisible"
        position={Position.Right}
        id="b"
      />
      <Handle
        type="source"
        className="invisible"
        position={Position.Bottom}
        id="c"
      />
      <Handle
        type="source"
        className="invisible"
        position={Position.Left}
        id="d"
      />
    </motion.div>
  );
}