import { Edge, useInternalNode } from "@xyflow/react";
import { getEdgeParams } from "./utils";
import { motion } from "framer-motion";

function FloatingEdge({ id, source, target, markerEnd, style }: Edge) {
  const sourceNode = useInternalNode(source);
  const targetNode = useInternalNode(target);

  if (!sourceNode || !targetNode) {
    return null;
  }

  const { sx, sy, tx, ty } = getEdgeParams(sourceNode, targetNode);

  const edgePath = `M ${sx} ${sy} L ${tx} ${ty}`;

  return (
    <motion.path
      id={id}
      d={edgePath}
      strokeWidth={5}
      markerEnd={markerEnd as string}
      style={style}
      className="react-flow__edge-path"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      whileHover={{ stroke: "#f59e0b" }} // Màu khi hover
    >
      <defs>
        <linearGradient id={`gradient-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#9333ea" />
        </linearGradient>
      </defs>
      <motion.path
        d={edgePath}
        stroke={`url(#gradient-${id})`}
        strokeWidth={5}
        fill="none"
        strokeDasharray="10,5"
        initial={{ strokeDashoffset: 0 }}
        animate={{ strokeDashoffset: -15 }}
        transition={{
          repeat: Infinity,
          duration: 2,
          ease: "linear",
        }}
      />
    </motion.path>
  );
}

export default FloatingEdge;