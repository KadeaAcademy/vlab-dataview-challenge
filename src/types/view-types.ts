import SmartBezierEdge from "@tisoap/react-flow-smart-edge";
import { Edge, Node } from "reactflow";

export type GraphDataviewType = {
  dfg: CustomEdge[];
  start: any;
  end: any;
};

export const edgeTypes = {
  smart: SmartBezierEdge,
};

export type CustomEdge =
  | Edge
  | {
      source: string; 
      target: string;
      label: number;
    };

export const startNode: Node = {
  id: "1",
  position: { x: 0, y: 0 },
  data: { label: "Input" },
  style: {
    backgroundColor: "red",
    color: "white",
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    textAlign: "center",
  },
};

export const endNode: Node = {
  id: "2",
  // TODO: use components width and heights instead of 1600 and 900
  position: { x: 1600, y: 900 },
  data: { label: "Output" },
  style: {
    backgroundColor: "red",
    color: "white",
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    textAlign: "center",
  },
};
