import { IconButton } from "@mui/material"
import { StepCard, StepIcons, StepsContainer } from "../styles"
import { Edit, Visibility } from "@mui/icons-material"

function stepCard(step) {
  return <StepCard>
    {step.title}
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

export default function StepsTab({ steps }) {
  const orderedSteps = steps.sort((step1, step2) => step1.value - step2.value)
  return (<StepsContainer>
    {orderedSteps.map(stepCard)}
  </StepsContainer>)
}