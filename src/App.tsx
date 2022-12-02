import "./App.css";
import GraphDataViewer from "./components/GraphDataViewer";

import { dfg as initDfg } from "./data/sample/dfg";
import { start } from "./data/sample/start";
import { end } from "./data/sample/end";
import { useEffect, useState } from "react";
import { CustomEdge } from "./types/view-types";
import { ReactFlowProvider } from "reactflow";

function App() {
  const [dfg, setDfg] = useState<CustomEdge[]>([]);

  useEffect(() => {
    setDfg(initDfg);
  }, []);

  return (
    <ReactFlowProvider>
      <GraphDataViewer dfg={dfg} start={start} end={end} />
    </ReactFlowProvider>
  );
}

export default App;
