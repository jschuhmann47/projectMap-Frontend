import { IconButton } from "@mui/material"
import { StepCard, StepIcons, StepsContainer } from "../styles"
import { Edit, HelpOutlined, Visibility } from "@mui/icons-material"
import StepInfoModal from "./stepInfoModal"
import { useState } from "react"

function StepCardView({ step, setStep, permission }) {
  return <StepCard style={{backgroundColor: step.color}}>
    {step.title}
    <IconButton>
      <HelpOutlined onClick={() => setStep(step.value)} />
    </IconButton>
    <StepIcons>
      {
        permission !== 'hide' &&
        <IconButton onClick={(e) => step.onClickList(step.value, e.currentTarget)}>
          <Visibility />
        </IconButton>
      }
      {
        permission === 'edit' &&
        <IconButton onClick={(e) => step.onClickAdd(step.value, e.currentTarget)}>
          <Edit />
        </IconButton>
      }
    </StepIcons>
  </StepCard>
}

export default function StepsTab({ steps, hasFullPermissions, stepPermissions }) {
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

  return <StepsContainer>
    {orderedSteps.map((step) =>
      <StepCardView
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