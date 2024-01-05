import ReactDOM from "react-dom";

function ModalPotal({ children }: any) {
  const el = document.getElementById("modal");
  return ReactDOM.createPortal(children, el);
}

export default ModalPotal;
