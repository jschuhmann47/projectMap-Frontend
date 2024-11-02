import { IconButton } from "@mui/material"
import { StepCard, StepIcons, StepsContainer } from "../styles"
import { Edit, HelpOutlined, Visibility } from "@mui/icons-material"
import StepInfoModal from "./stepInfoModal"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

function StepCardView({ step, setStep, onClick }) {
  return <StepCard style={{backgroundColor: step.color, cursor: 'pointer'}} onClick={() => onClick(step)}>
    {step.title}
    <IconButton>
      <HelpOutlined onClick={(e) => {setStep(step); e.stopPropagation();}} />
    </IconButton>
  </StepCard>
}

export default function StepsTab({ steps, hasFullPermissions, stepPermissions, projectId }) {
  const navigate = useNavigate();

  const orderedSteps = steps.sort((step1, step2) => step1.value - step2.value)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStep, setSelectedStep] = useState(0);
  
  function setStep(step) {
    setSelectedStep(step);
    setIsModalOpen(true);
  }

  function stepPermission(step) {
    if (hasFullPermissions) return 'edit'
    if (!stepPermissions) return 'hide'
    return stepPermissions.find((p) => p.id === step).permission
  }

  const handleOnStepClick = (step) => {
    navigate(`/projects/${projectId}/stage/${step.id}`)
  }
  return <StepsContainer>
    {orderedSteps.map((step) =>
      <StepCardView
        onClick={handleOnStepClick}
        step={step}
        setStep={setStep}
        permission={stepPermission(step.id)}
      />
      )
    }
    <StepInfoModal
      isOpen={isModalOpen}
      selectedStep={selectedStep}
      onClose={() => setIsModalOpen(false)}
    />
  </StepsContainer>;
}