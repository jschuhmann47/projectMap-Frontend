import { horizonOptions } from "helpers/enums/okr";
import { EditObjectiveButton, OkrContainerV2, OkrHeader, OkrMoreData, OkrTitle } from "./styles";
import Button from "components/commons/Button";

const OKRView = ({
  okrData,
  openEditOkrModal,
  isEditOkrModalOpen,
}) => {
  return <OkrContainerV2>
    <OkrHeader>
      <OkrTitle>{okrData?.description}</OkrTitle>
      <EditObjectiveButton>
        <Button onClick={openEditOkrModal}>Editar objetivo</Button>
      </EditObjectiveButton>
    </OkrHeader>
    <OkrMoreData>
      <span>Área: {okrData?.area}</span>
      <span>Horizonte: {horizonOptions[okrData?.horizon]}</span>
      <span>Prioridad: {okrData?.priority}</span>
      <span>Avance: {okrData?.progress * 100}%</span>
    </OkrMoreData>
    {isEditOkrModalOpen && 'se abrió el modal'}
  </OkrContainerV2>
};

export default OKRView;
