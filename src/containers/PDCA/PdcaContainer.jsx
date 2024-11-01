import { Box, Grid } from "@mui/material";
import Button from "components/commons/Button";
import LayoutContainer from "containers/LayoutContainer";
import { DEMING_STAGE_ACT, DEMING_STAGE_DO, DEMING_STAGE_PLAN, DEMING_STAGE_CHECK, DemingStage } from "helpers/enums/pdca";
import { StageByTool, Tools } from "helpers/enums/steps";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { changeDemingStage, onGetOne, onPatch } from "redux/actions/pdca.actions";
import { ButtonsContainer } from "styles/form";
import Stage1View from "views/PdcaView/stage1";
import Stage2View from "views/PdcaView/stage2";
import Stage3View from "views/PdcaView/stage3";
import Stage4View from "views/PdcaView/stage4";

export default function PdcaContainer() {
  const { id, pdcaId } = useParams()
  const dispatch = useDispatch()
  const { loading, data, demingStage } = useSelector((state) => state.pdca)
  const navigate = useNavigate()
  const [inputValue, setInputValue] = useState("")

  useEffect(() => {
    dispatch(onGetOne(pdcaId))
  }, [])

  function onClickBack() {
    const stage = StageByTool[Tools.Pdca];
    navigate(`/projects/${id}/stage/${stage}`)
  }

  function onAddAction() {
    const formData = { actions: [{ name: inputValue }, ...data.actions] }
    dispatch(onPatch(pdcaId, formData))
    setInputValue("")
  }

  function onRemoveAction(actionName) {
    const formData = { actions: data.actions.filter((a) => a.name !== actionName) }
    dispatch(onPatch(pdcaId, formData))
  }

  function onEditAction(editedAction) {
    const formData = {
      actions: data.actions.map((a) => a._id === editedAction._id ? editedAction : a)
    }
    dispatch(onPatch(pdcaId, formData))
  }

  const stageView = useMemo(() => {
    switch (demingStage) {
      case DEMING_STAGE_PLAN:
        return (
          <Stage1View
            loading={loading}
            pdcaData={data}
            onClickBack={onClickBack}
            onAddAction={onAddAction}
            onRemoveAction={onRemoveAction}
            inputValue={inputValue}
            setInputValue={(e) => setInputValue(e.target.value)}
          />
        )
      case DEMING_STAGE_DO:
        return (
          <Stage2View
            loading={loading}
            pdcaData={data}
            onClickBack={onClickBack}
            onEditAction={onEditAction}
          />
        )
      case DEMING_STAGE_CHECK:
        return (
          <Stage3View
            loading={loading}
            pdcaData={data}
            onClickBack={onClickBack}
            onEditAction={onEditAction}
          />
        )
      case DEMING_STAGE_ACT:
        return (
          <Stage4View
            loading={loading}
            pdcaData={data}
            onClickBack={onClickBack}
          />
        )
    }
  }, [demingStage])

  function goToPreviousStage() {
    dispatch(changeDemingStage(demingStage - 1))
  }

  function goToNextStage() {
    dispatch(changeDemingStage(demingStage + 1))
  }

  return (
    <LayoutContainer>
      <Grid item sx={{ height: '100%', width: '100%' }}>
        {stageView}
        <Box sx={{ position: 'relative', marginTop: 5 }}>
          {demingStage !== DEMING_STAGE_PLAN && (
            <Box sx={{ position: 'absolute', left: '5%' }}>
              <Button onClick={goToPreviousStage}>
                Etapa anterior
              </Button>
            </Box>
          )}
          {demingStage !== DEMING_STAGE_ACT && (
            <Box sx={{ position: 'absolute', right: '5%' }}>
              <Button onClick={goToNextStage}>
                Siguiente etapa
              </Button>
            </Box>
          )}
        </Box>
      </Grid>
    </LayoutContainer>
  )
}