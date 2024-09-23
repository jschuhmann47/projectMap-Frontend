import { stepsInfo } from "helpers/enums/steps";
import parse from "html-react-parser";
import { StepInfo } from "../styles";
import ModalV2 from "components/commons/ModalV2";

export default function StepInfoModal({ isOpen, selectedStep, onClose }) {
  const title = stepsInfo[selectedStep]?.title ?? ''
  const description = stepsInfo[selectedStep]?.description ?? ''
  return <ModalV2
    isOpen={isOpen}
    onClose={onClose}
    title={title}
  >
    <StepInfo>
      {parse(description)}
    </StepInfo>
  </ModalV2>
}