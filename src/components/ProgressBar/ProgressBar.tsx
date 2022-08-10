import * as React from 'react';
import MobileStepper from '@mui/material/MobileStepper';

export default function ProgressBar(props: any) {
  const maxStep: any = props.maxStep;
  const activeStep: any = props.activeStep;

  return (
    <MobileStepper
      variant="progress"
      steps={maxStep}
      position="static"
      activeStep={activeStep}
      sx={{ maxWidth: 400, flexGrow: 1 }}
      nextButton=""
      backButton=""
    />
  );
}
