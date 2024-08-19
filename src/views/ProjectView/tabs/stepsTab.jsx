import { IconButton } from "@mui/material"
import { StepCard, StepIcons, StepsContainer } from "../styles"
import { Edit, HelpOutlined, Visibility } from "@mui/icons-material"
import StepInfoModal from "./stepInfoModal"
import { useState } from "react"

function stepCard({ step, setStep, hasFullPermissions }) {
  return <StepCard>
    {step.title}
    <IconButton>
      <HelpOutlined onClick={() => setStep(step.value)} />
    </IconButton>
    <StepIcons>
      <IconButton onClick={(e) => step.onClickList(step.value, e.currentTarget)}>
        <Visibility />
      </IconButton>
      <IconButton onClick={(e) => step.onClickAdd(step.value, e.currentTarget)}>
        <Edit />
      </IconButton>
    </StepIcons>
  </StepCard>
}

export default function StepsTab({ steps, hasFullPermissions }) {
  const orderedSteps = steps.sort((step1, step2) => step1.value - step2.value)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStep, setSelectedStep] = useState(0);

  function setStep(step) {
    setSelectedStep(step);
    setIsModalOpen(true);
  }

  return <StepsContainer>
    {orderedSteps.map((step) => stepCard({ step, setStep, hasFullPermissions }))}
    <StepInfoModal
      isOpen={isModalOpen}
      selectedStep={selectedStep}
      onClose={() => setIsModalOpen(false)}
    />
  </StepsContainer>;
}