import { Node, useReactFlow } from "reactflow";
type ZoomProps = {
  node: Node;
};
const Zoom: React.FC<ZoomProps> = ({ node }) => {
  const { setCenter } = useReactFlow();

  const focusNode = () => {
    const x =
      node.position.x + (typeof node.width == "number" ? node.width / 2 : 0);
    const y =
      node.position.y + (typeof node.height == "number" ? node.height / 2 : 0);
    const zoom = 1.85;

    setCenter(x, y, { zoom, duration: 1000 });
  };

  return (
    <div className="aside">
      <button onClick={focusNode}>zoom focus node</button>
    </div>
  );
};

export default Zoom;
