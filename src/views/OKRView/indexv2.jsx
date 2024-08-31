import { horizonOptions } from "helpers/enums/okr";
import { OkrContainerV2, OkrMoreData, OkrTitle } from "./styles";

const OKRView = ({
  okrData
}) => {
  return <OkrContainerV2>
    <OkrTitle>{okrData?.description}</OkrTitle>
    <OkrMoreData>
      <span>Área: {okrData?.area}</span>
      <span>Horizonte: {horizonOptions[okrData?.horizon]}</span>
      <span>Prioridad: {okrData?.priority}</span>
      <span>Avance: {okrData?.progress * 100}%</span>
    </OkrMoreData>
  </OkrContainerV2>
};

export default OKRView;
