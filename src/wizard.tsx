import * as React from 'react';
import { useMachine } from '@xstate/react';
import { Machine, Sender, assign } from 'xstate';
import { createUser, updateUser } from './lib/user';
import { useForm, SubmitHandler } from 'react-hook-form';
import styled from 'styled-components';
import { Input } from './components/Input';
import { Button, SubmitButton } from './components/Button';
import { Stepper } from './components/Stepper';

interface newUserSchema {
  states: {
    name: {};
    animal: {};
    adjective: {};
    terms: {};
    success: {};
  };
}

interface newUserContext {
  user: {
    id?: number;
    name?: string;
    animal?: string;
    adjective?: string;
    terms?: boolean;
  };
}

// The events that the machine handles
type newUserEvent =
  | { type: 'NEXT'; user: Record<string, unknown> }
  | { type: 'PREV'; user?: Record<string, unknown> };

const toggleMachine = Machine<newUserContext, newUserSchema, newUserEvent>(
  {
    id: 'newUser',
    initial: 'name',
    context: {
      user: {},
    },
    states: {
      name: {
        on: {
          NEXT: {
            target: 'animal',
            actions: 'storeUserInContext',
          },
        },
      },
      animal: {
        on: {
          NEXT: {
            target: 'adjective',
            actions: 'storeUserInContext',
          },
          PREV: {
            target: 'name',
          },
        },
      },
      adjective: {
        on: {
          NEXT: {
            target: 'terms',
            actions: 'storeUserInContext',
          },
          PREV: {
            target: 'animal',
          },
        },
      },
      terms: {
        on: {
          NEXT: { target: 'success' },
          PREV: {
            target: 'adjective',
          },
        },
      },
      success: {
        on: {
          NEXT: { target: 'name' },
          PREV: {
            target: 'adjective',
          },
        },
      },
    },
  },
  {
    actions: {
      storeUserInContext: assign({
        user: (context, event) => ({ ...event.user, ...context.user }),
      }),
    },
  },
);

const Name: React.FunctionComponent<{
  context: newUserContext;
  send: Sender<newUserEvent>;
}> = ({ context, send }) => {
  const { register, handleSubmit, errors, formState } = useForm<{
    name: string;
  }>();
  const { isSubmitting } = formState;

  const onSubmit: SubmitHandler<{ name: string }> = async (data) => {
    try {
      const user = await createUser(data);
      send({ type: 'NEXT', user: user });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <h3>Please enter a name</h3>
      {/* <div>{JSON.stringify(context)}</div> */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          name="name"
          defaultValue={context.user.name || ''}
          placeholder="name"
          ref={register({ required: true })}
        />
        {errors.name && <span>This field is required</span>}
        <SubmitButton type="submit" disabled={isSubmitting} />
        <Button type="button" onClick={() => send({ type: 'PREV' })}>
          Prev
        </Button>
      </form>
    </>
  );
};

const Animal: React.FunctionComponent<{
  context: newUserContext;
  send: Sender<newUserEvent>;
}> = ({ context, send }) => {
  const { register, handleSubmit, errors, formState } = useForm<{
    animal: string;
  }>();
  const { isSubmitting } = formState;

  const onSubmit: SubmitHandler<{ email: string }> = async (data) => {
    try {
      const user = await updateUser(context.user.id as number, data);
      send({ type: 'NEXT', user: user });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <h3>Please enter a email</h3>
      <div>{JSON.stringify(context)}</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          name="animal"
          placeholder="🐱‍👤"
          defaultValue={context.user.animal}
          ref={register({ required: true })}
        />
        {errors.animal && <span>This field is required</span>}
        <input type="submit" disabled={isSubmitting} />
        <button onClick={() => send({ type: 'PREV' })}>Prev</button>
      </form>
    </>
  );
};

const Adjective: React.FunctionComponent<{
  context: newUserContext;
  send: Sender<newUserEvent>;
}> = ({ context, send }) => {
  const { register, handleSubmit, errors, formState } = useForm<{
    adjective: string;
  }>();

  const { isSubmitting } = formState;

  const onSubmit: SubmitHandler<{ adjective: string }> = async (data) => {
    try {
      const user = await updateUser(context.user.id as number, data);
      send({ type: 'NEXT', user: user });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <h3>Please enter a password</h3>
      <div>{JSON.stringify(context)}</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          name="adjective"
          placeholder="adjective"
          defaultValue={context.user.adjective}
          ref={register({ required: true })}
        />
        {errors.adjective && <span>This field is required</span>}
        <input type="submit" disabled={isSubmitting} />
        <button onClick={() => send({ type: 'PREV' })}>Prev</button>
      </form>
    </>
  );
};

const Terms: React.FunctionComponent<{
  context: newUserContext;
}> = ({ context }) => {
  return (
    <>
      <h3>Terms</h3>
      <div>{JSON.stringify(context)}</div>
    </>
  );
};

const Success: React.FunctionComponent<{
  context: newUserContext;
}> = ({ context }) => {
  return (
    <>
      <h3>Success</h3>
      <div>{JSON.stringify(context)}</div>
    </>
  );
};

const Wrapper = styled.div`
  width: 60%;
  height: 60%;
  background: #ffffff;
  box-shadow: 0px 16px 24px rgba(0, 0, 0, 0.06), 0px 2px 6px rgba(0, 0, 0, 0.04),
    0px 0px 1px rgba(0, 0, 0, 0.04);
  border-radius: 12px;
  z-index: 1;

  & > div {
    margin: 1rem;
  }
`;

const Debugger = styled.div`
  width: 60%;
  height: 6rem;
  margin-top: -1.5rem;
  background: rgba(255, 255, 255, 0.37);
  backdrop-filter: blur(1px);
  /* Note: backdrop-filter has minimal browser support */

  border-radius: 12px;
`;

const StepWizardContainer = styled.main`
  display: flex;
`;

const Progress = styled.div`
  flex: 1;

  /* Just for testing purpose */
  background-color: lightgray;
`;

const StepContainer = styled.div`
  flex: 2;
  background-color: lightgoldenrodyellow;
`;

export const Toggler = () => {
  const [state, send] = useMachine(toggleMachine);
  const [steps, setSteps] = React.useState<
    { name: string; value: string; status: string }[]
  >([]);

  React.useEffect(() => {
    setSteps(
      Object.keys(toggleMachine.states).map((step) => ({
        name: step,
        /* Error should be investigated */
        value: state.context.user[step] || '',
        status: state.matches(step)
          ? 'current'
          : state.context.user[step]
          ? 'done'
          : 'undone',
      })),
    );
  }, [state]);

  return (
    <>
      <Wrapper>
        <div>
          <h1>Get your spirit animal</h1>
          <StepWizardContainer>
            <Progress>
              <Stepper steps={steps} />
            </Progress>
            <StepContainer>
              {state.matches('name') ? (
                <Name context={state.context} send={send} />
              ) : state.matches('animal') ? (
                <Animal context={state.context} send={send} />
              ) : state.matches('adjective') ? (
                <Adjective context={state.context} send={send} />
              ) : state.matches('terms') ? (
                <Terms context={state.context} />
              ) : state.matches('success') ? (
                <Success context={state.context} />
              ) : (
                <div>undefined</div>
              )}
            </StepContainer>
          </StepWizardContainer>
        </div>
      </Wrapper>
      <Debugger></Debugger>
    </>
  );
};
