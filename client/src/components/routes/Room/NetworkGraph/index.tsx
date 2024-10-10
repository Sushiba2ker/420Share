import React, { useEffect, useState, useCallback } from "react";
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  ConnectionMode,
  type Node,
  type Edge,
  ReactFlowInstance,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import SimpleFloatingEdge from "./FloatingEdge";
import UserNode from "./UserNode";

interface NetworkGraphProps {
  users: string[];
  isSending: boolean;
  isReceiving: boolean;
}

const nodeTypes = {
  custom: UserNode,
};

const edgeTypes = {
  floating: SimpleFloatingEdge,
};

const createNodesAndEdges = (
  users: string[],
  isSending: boolean,
  isReceiving: boolean
): { nodes: Node[]; edges: Edge[] } => {
  const nodes: Node[] = [];
  const edges: Edge[] = [];
  const centerX = 250;
  const centerY = 250;
  const radius = 100;

  users.forEach((user, i) => {
    const angle = (i / users.length) * 2 * Math.PI;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    nodes.push({
      id: `${user}`,
      position: { x, y },
      data: { label: user, isSending: isSending && i === 0, isReceiving: isReceiving && i !== 0 },
      type: "custom",
    });
  });

  if (isSending || isReceiving) {
    // Tạo các cạnh từ node đầu tiên đến các node khác khi đang gửi hoặc nhận
    users.slice(1).forEach((targetUser) => {
      edges.push({
        id: `${users[0]}-${targetUser}`,
        source: `${users[0]}`,
        target: `${targetUser}`,
        sourceHandle: `a`,
        targetHandle: `b`,
        type: "floating",
        animated: true,
        selectable: false,
        focusable: false,
      });
    });
  } else {
    // Khi không gửi và không nhận, tạo các cạnh giữa tất cả các node
    users.forEach((sourceUser, i) => {
      users.slice(i + 1).forEach((targetUser) => {
        edges.push({
          id: `${sourceUser}-${targetUser}`,
          source: `${sourceUser}`,
          target: `${targetUser}`,
          sourceHandle: `a`,
          targetHandle: `b`,
          type: "floating",
          animated: true,
          selectable: false,
          focusable: false,
        });
      });
    });
  }

  return { nodes, edges };
};

const styles = {
  background: "#121417",
  // bo góc 10px
  borderRadius: "10px",
};

const NetworkGraph: React.FC<NetworkGraphProps> = ({ users, isSending, isReceiving }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);

  const onInit = useCallback((rf: ReactFlowInstance) => {
    setReactFlowInstance(rf);
  }, []);

  useEffect(() => {
    if (users.length > 0) {
      const { nodes: newNodes, edges: newEdges } = createNodesAndEdges(users, isSending, isReceiving);
      setNodes((oldNodes) => {
        return newNodes.map((node) => {
          const oldNode = oldNodes.find((n) => n.id === node.id);
          return oldNode ? { ...node, position: oldNode.position } : node;
        });
      });
      setEdges(newEdges);
    }
  }, [users, isSending, isReceiving, setNodes, setEdges]);

  useEffect(() => {
    if (reactFlowInstance && nodes.length > 0) {
      reactFlowInstance.fitView({ padding: 0.2, includeHiddenNodes: true });
    }
  }, [reactFlowInstance, nodes]);

  return (
    <div className="h-48 sm:h-64 sm:w-[500px]">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        edgeTypes={edgeTypes}
        nodeTypes={nodeTypes}
        connectionMode={ConnectionMode.Loose}
        onInit={onInit}
        fitView
        colorMode="light"
        elementsSelectable={false}
        nodesConnectable={false}
        panOnDrag={false}
        nodesDraggable={false}
        zoomOnPinch={false}
        zoomOnScroll={false}
        zoomOnDoubleClick={false}
        style={styles}
      />
    </div>
  );
};

export default NetworkGraph;