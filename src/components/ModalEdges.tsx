import { Badge, Modal } from "react-bootstrap";
import { CustomEdge, ModalEdgesProps } from "../types/view-types";

const ModalEdges: React.FC<ModalEdgesProps> = ({
  data,
  focusNode,
  ...props
}) => {
  return (
    <Modal
      {...props}
      // size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      // centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <h3>{focusNode?.id}</h3>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          <h4>Inbound transactions</h4>
          {data.in?.map((edge: CustomEdge, key: number) => (
            <div className="" key={key}>
              <Badge bg="success">{"from "}</Badge>
              <span>{edge.source}</span>
              <Badge bg="info">{edge.label}</Badge>
            </div>
          ))}
        </p>
        <p>
          <h4>Outbound transactions</h4>
          {data.out?.map((edge: CustomEdge, key: number) => (
            <div className="" key={key}>
              <Badge bg="danger">{"to "}</Badge>
              <span>{edge.target}</span>
              <Badge bg="info">{edge.label}</Badge>
            </div>
          ))}
        </p>
        <p>
          <h4>Reflexive transactions</h4>
          <div>
            <Badge bg="success">{"self "}</Badge>
            <span>{`${focusNode?.id} `}</span>
            <Badge bg="info">
              {data.self?.length ? data.self[0].label : 0}
            </Badge>
          </div>
        </p>
      </Modal.Body>
      {/* <Modal.Footer>
        <Button onClick={()=>props.onHide}>Close</Button>
      </Modal.Footer> */}
    </Modal>
  );
};

export default ModalEdges;
