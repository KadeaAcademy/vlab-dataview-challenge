import { useState, useCallback, PropsWithChildren, useEffect } from "react";
import ReactFlow, {
  applyEdgeChanges,
  applyNodeChanges,
  Controls,
  Background,
  useReactFlow,
  NodeChange,
  EdgeChange,
  NodeMouseHandler,
  MarkerType,
  Node,
  Edge,
} from "reactflow";
import "reactflow/dist/style.css";

import {
  CustomEdge,
  edgeTypes,
  endNode,
  GraphDataviewType,
  startNode,
} from "../types/view-types";
import { generateEdgePosition } from "../utils/view-utils";

const nodeInboundEdgesSum = (currentNodeId: string, edges: CustomEdge[]) => {
  const inboundArrowsWeigths = edges.map(({ target: targetNodeId, label }) => {
    return targetNodeId === currentNodeId
      ? typeof label === "number"
        ? label
        : 0
      : 0;
  });
  return inboundArrowsWeigths.reduce(
    (total, arrowWeight) => total + arrowWeight,
    0
  );
};

type GraphDataviewProps = PropsWithChildren<GraphDataviewType>;

const GraphDataViewer: React.FC<GraphDataviewProps> = ({
  dfg,
  start,
  end,
  children,
  ...rest
}) => {
  const { setCenter } = useReactFlow();

  const [nodes, setNodes] = useState<(Node | any)[]>([]);
  const [edges, setEdges] = useState<(Edge | any)[]>([]);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const handleNodeClick: NodeMouseHandler = (event, node) => {
    const x =
      node.position.x + (typeof node.width === "number" ? node.width / 2 : 0);
    const y =
      node.position.y + (typeof node.height === "number" ? node.height / 2 : 0);
    const zoom = 1.85;

    setCenter(x, y, { zoom, duration: 1000 });
  };

  const initialEdges: CustomEdge[] = Object.keys(start).map((key, value) => {
    return {
      id: `1-${key}`,
      source: "1",
      target: key,
      sourceHandle: "a",
      label: value,
      markerEnd: {
        color: "#FF0072",
        width: 25,
        height: 25,
        type: "arrowclosed",
        strokeWidth: 1,
      },
    };
  });

  const endEdges: CustomEdge[] = Object.keys(end).map((key, value) => {
    return {
      id: `${key} - 2`,
      source: key,
      target: "2",
      sourceHandle: "b",
      label: value,
      markerEnd: {
        color: "#FF0072",
        width: 25,
        height: 25,
        type: "arrowclosed",
        strokeWidth: 1,
      },
      type: "smart",
    };
  });

  const dfgEdges: CustomEdge[] = dfg.map(({ label, source, target }) => {
    return {
      id: `${source} - ${target}`,
      source: source,
      target: target,
      sourceHandle: "c",
      label: label,
      markerEnd: {
        color: "#FF0072",
        width: 25,
        height: 25,
        type: MarkerType.ArrowClosed,
        strokeWidth: 1,
      },
      type: "smart",
    };
  });

  const initialNodes: Node[] = Object.keys(start).map((key, index) => {
    return {
      id: `${key}`,
      position: generateEdgePosition(),
      data: {
        label: `${key} (${nodeInboundEdgesSum(key, [
          ...initialEdges,
          ...endEdges,
          ...dfgEdges,
        ])})`,
      },
    };
  });
  useEffect(() => {
    setNodes([...initialNodes, startNode, endNode]);
    setEdges([...initialEdges, ...endEdges, ...dfgEdges]);
  }, []);

  return (
    <div style={{ height: "100vh", overflow: "hidden" }}>
      <ReactFlow
        fitView
        onNodeClick={handleNodeClick}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        edgeTypes={edgeTypes}
        nodes={nodes}
        edges={edges}
        {...rest}
      >
        {children}
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default GraphDataViewer;
