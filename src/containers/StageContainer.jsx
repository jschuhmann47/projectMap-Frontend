import { useParams } from "react-router-dom";
import LayoutContainer from "./LayoutContainer";
import { useDispatch, useSelector } from "react-redux";
import {
  onGetAnsoff,
  onGetBalanced,
  onGetFoda,
  onGetMckinsey,
  onGetOKR,
  onGetOne,
  onGetPestel,
  onGetPorter,
  onGetQuestionnaire,
  onGetSharedUsers,
  onSearchByEmail,
  onShareUser,
  onUnShareUsers,
  openModal,
  closeModal,
  onAddUser,
  changeMemberPermission,
  changeMemberRole,
  onSaveMembers,
  goBackModal
} from 'redux/actions/projects.actions';
import { IconButton } from "@mui/material"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { selectorByStage, stepToolsSelector } from "redux/selectors/project.selector";
import { StepCard } from "views/ProjectView/styles";
import { HelpOutlined } from "@mui/icons-material";
import { STEPS } from "helpers/enums/steps";

const isValidStage = (name) => [
  'externalEnvironment',
  'internalSituation',
  'strategicGuidelines',
  'competitiveStrategy',
  'transformationPlans',
  'financialPlanning'
].includes(name);

const findCurrentStep = (stepId) => {
  return 
}

const StageContainer = () => {
  const dispatch = useDispatch();
  const { id, stageName } = useParams();
  const navigate = useNavigate();
  const [step, setStep] = useState(null);
  
  //const toolsItems = useSelector(stepToolsSelector);
  const toolsItems = useSelector(selectorByStage[stageName]);
  console.log({toolsItems})
  const getToolsFor = {
    'externalEnvironment': () => { dispatch(onGetPestel(id)); dispatch(onGetPorter(id)) },
    'internalSituation': () => { dispatch(onGetFoda(id)) },
    'strategicGuidelines': () => { dispatch(onGetAnsoff(id)) },
    'competitiveStrategy': () => { dispatch(onGetMckinsey(id)) },
    'transformationPlans': () => { dispatch(onGetQuestionnaire(id)) },
    'financialPlanning': () => { dispatch(onGetBalanced(id)); dispatch(onGetOKR(id)) }
  }

  useEffect(() => {
    if (isValidStage(stageName)) {
      getToolsFor[stageName]();
    } else {
      navigate(`/dashboard`)
    }

    if (stageName) {
      const step = STEPS.find(({id}) => id == stageName);
      if (step) {
        setStep(step)
      }
    }
  }, [id, stageName]);

  return (
    <LayoutContainer>
      {step && 
        <StepCard style={{backgroundColor: step?.color}}>
          {step?.title}
          <IconButton>
            <HelpOutlined onClick={() => {}} />
          </IconButton>
        </StepCard>
      }
    </LayoutContainer>
  );
};

export default StageContainer;