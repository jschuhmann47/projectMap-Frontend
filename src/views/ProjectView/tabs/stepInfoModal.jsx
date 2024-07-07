import Modal from "components/commons/Modal";
import { stepsInfo } from "helpers/enums/steps";
import parse from "html-react-parser";
import { StepInfo, Title } from "../styles";

export default function StepInfoModal({ isOpen, selectedStep, onClose }) {
  const title = stepsInfo[selectedStep]?.title ?? ''
  const description = stepsInfo[selectedStep]?.description ?? ''
  return <Modal
    isOpen={isOpen}
    onClose={onClose}
    backgroundColor="#C7DAD9"
  >
    <StepInfo>
      <Title>{title}</Title>
      {parse(description)}
    </StepInfo>
  </Modal>
}