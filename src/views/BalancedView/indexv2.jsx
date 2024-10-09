import { AddCircle, ArrowBack } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { Area } from "helpers/enums/balanced";
import KeyResult from "views/OKRView/components/KeyResult";
import { KeyResultsContainer, KeyResultsHeader, OkrContainerV2, OkrHeader, OkrTitle } from "views/OKRView/styles";

export default function BalancedView({
  objectives,
  onClickButtonGoBack,
  title
}) {
  function krifyObjective(obj) {
    return {
      description: obj.action,
      responsible: obj.responsible,
    }
  }

  function renderArea(area) {
    return (
      <>
        <KeyResultsHeader>
          {area}
          <IconButton onClick={() => {}}>
            <AddCircle htmlColor="black" />
          </IconButton>
        </KeyResultsHeader>
        <KeyResultsContainer>
          {objectives[area].map((obj, index) => (
            <KeyResult
              key={index}
              krData={krifyObjective(obj)}
              openConfirmDeleteModal={() => {}}
              handleKrClick={() => {}}
            />
          ))}
        </KeyResultsContainer>
      </>
    )
  }

  return (
    <OkrContainerV2>
      <OkrHeader>
        <IconButton size="small" onClick={onClickButtonGoBack} sx={{ position: 'absolute', left: 0 }}>
          <ArrowBack />
        </IconButton>
        <OkrTitle>{title}</OkrTitle>
      </OkrHeader>
      {Object.values(Area).map(renderArea)}
    </OkrContainerV2>
  )
}