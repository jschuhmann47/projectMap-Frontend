import { Grid } from "@mui/material";
import LayoutContainer from "containers/LayoutContainer";
import { DemingStage } from "helpers/enums/pdca";
import { StageByTool, Tools } from "helpers/enums/steps";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { onGetOne, onPatch } from "redux/actions/pdca.actions";
import PdcaView from "views/PdcaView";

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

  switch(demingStage) {
    case DemingStage.Planificar:
      return (
        <LayoutContainer>
          <Grid item sx={{ height: '100%', width: '100%' }}>
            <PdcaView
              loading={loading}
              pdcaData={data}
              onClickBack={onClickBack}
              onAddAction={onAddAction}
              onRemoveAction={onRemoveAction}
              inputValue={inputValue}
              setInputValue={(e) => setInputValue(e.target.value)}
            />
          </Grid>
        </LayoutContainer>
      )
  }  
}