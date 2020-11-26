import * as React from 'react';
import styled from 'styled-components';
import { Check } from 'react-feather';

const Container = styled.div`
  padding: 2rem 2.5rem;
`;

const Step = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
`;

const Circle = styled.div<{ status: string }>`
  background: ${(props) =>
    props.status == 'done' ? props.theme.colors.primary : 'white'};
  border: 2px solid
    ${(props) =>
      props.status == 'undone'
        ? props.theme.colors.light
        : props.theme.colors.primary};
  width: 2.1rem;
  height: 2.1rem;
  line-height: 2.1rem;
  border-radius: 2.1rem;
  position: relative;
  color: white;
  text-align: center;
  display: flex;
  place-content: center;
  align-items: center;

  transition: all 0.3s;
`;

const Line = styled.div`
  position: relative;
  border-left: 2px solid ${(props) => props.theme.colors.primary};
  height: 2rem;
`;

const StepBar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StepText = styled.div`
  flex: 2;
  margin-left: 2rem;
`;

const STEPNAMES = {
    name: 'Enter your name',
    animal: 'Choose your animal',
    adjective: 'Choose a adjective',
    terms: 'Agree terms',
    success: 'Yup.'
}

const Stepper: React.FunctionComponent<{
  steps: {
    name: string;
    value: string;
    status: 'done' | 'undone' | 'current';
  }[];
}> = ({
  steps = [
    {
      name: 'Step #1',
      value: 'The value',
      status: 'current',
    },
  ],
}) => {
  return (
    <Container>
      {steps.map((step) => (
        <Step onClick={() => console.log(step)}>
          <StepBar>
            <Circle status={step.status}>
              <Check color="white" />
            </Circle>
            <Line />
          </StepBar>
          <StepText>
            <div>{step.name}</div>
            <div>{step.value}</div>
          </StepText>
        </Step>
      ))}
    </Container>
  );
};

export { Stepper };
