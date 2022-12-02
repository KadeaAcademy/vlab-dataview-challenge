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
import ModalEdges from "./ModalEdges";

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
  const [connectedEdges, setConnectedEdges] = useState({});
  const [focusNode, setFocusNode] = useState<Node>();
  const [modalShow, setModalShow] = useState(false);

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

  const handleNodeClick: NodeMouseHandler = (event, node:Node) => {
    setFocusNode(node);
    setConnectedEdges({
      in: findInboundEdges(edges, node.id),
      out: findOutboundEdges(edges, node.id),
      self: findReflexiveEdges(edges, node.id),
    });
    const x =
      node.position.x + (typeof node.width === "number" ? node.width / 2 : 0);
    const y =
      node.position.y + (typeof node.height === "number" ? node.height / 2 : 0);
    const zoom = 1.85;

    setCenter(x, y, { zoom, duration: 1000 });
    setModalShow(true);
  };

  const startEdges: CustomEdge[] = Object.keys(start).map((key) => {
    return {
      id: `START ACTIVITIES - ${key}`,
      source: "START ACTIVITIES",
      target: key,
      label: start[key],
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

  const endEdges: CustomEdge[] = Object.keys(end).map((key) => {
    return {
      id: `${key} - END ACTIVITIES`,
      source: key,
      target: "END ACTIVITIES",
      label: end[key],
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
          ...startEdges,
          ...endEdges,
          ...dfgEdges,
        ])})`,
      },
    };
  });
  useEffect(() => {
    setNodes([...initialNodes, startNode, endNode]);
    setEdges([...startEdges, ...endEdges, ...dfgEdges]);
  }, [dfg, start, end]);

  const findInboundEdges = (edges: CustomEdge[], nodeId: string) => {
    return edges.filter(
      (item) => item.target === nodeId && item.source !== item.target
    );
  };
  const findOutboundEdges = (edges: CustomEdge[], nodeId: string) => {
    return edges.filter(
      (item) => item.source === nodeId && item.target !== item.source
    );
  };
  const findReflexiveEdges = (edges: CustomEdge[], nodeId: string) => {
    return edges.filter(
      (item) => item.source === nodeId && item.source === item.target
    );
  };

  return (
    <div style={{ height: "100vh", overflow: "hidden" }}>
      <ModalEdges
        data={connectedEdges}
        focusNode={focusNode}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
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
