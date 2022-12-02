import { Modal } from "react-bootstrap";
import { ModalEdgesProps } from "../types/view-types";

const ModalEdges: React.FC<ModalEdgesProps> = ({ data, ...props }) => {
  return (
    <Modal
      {...props}
      // size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      // centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Centered Modal</h4>
        <p>{/* display data here */}</p>
      </Modal.Body>
      {/* <Modal.Footer>
        <Button onClick={()=>props.onHide}>Close</Button>
      </Modal.Footer> */}
    </Modal>
  );
};

export default ModalEdges;
