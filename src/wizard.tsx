import * as React from 'react';
import { useMachine } from '@xstate/react';
import { Machine, Sender, assign } from 'xstate';
import { createUser, updateUser } from './lib/user';
import { useForm, SubmitHandler } from 'react-hook-form';
import styled from 'styled-components';

interface newUserSchema {
  states: {
    name: {};
    email: {};
    password: {};
    confirmation: {};
  };
}

interface newUserContext {
  user: {
    id?: number;
    name?: string;
    email?: string;
    secret?: string;
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
            target: 'email',
            actions: 'storeUserInContext',
          },
        },
      },
      email: {
        on: {
          NEXT: {
            target: 'password',
            actions: 'storeUserInContext',
          },
          PREV: {
            target: 'name',
          },
        },
      },
      password: {
        on: {
          NEXT: {
            target: 'confirmation',
            actions: 'storeUserInContext',
          },
          PREV: {
            target: 'email',
          },
        },
      },
      confirmation: {
        on: {
          NEXT: { target: 'name' },
          PREV: {
            target: 'password',
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
      <div>{JSON.stringify(context)}</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          name="name"
          defaultValue={context.user.name || ''}
          placeholder="name"
          ref={register({ required: true })}
        />
        {errors.name && <span>This field is required</span>}
        <input type="submit" disabled={isSubmitting} />
        <button onClick={() => send({ type: 'PREV' })}>Prev</button>
      </form>
    </>
  );
};

const Email: React.FunctionComponent<{
  context: newUserContext;
  send: Sender<newUserEvent>;
}> = ({ context, send }) => {
  const { register, handleSubmit, errors, formState } = useForm<{
    email: string;
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
          name="email"
          placeholder="test@test.com"
          defaultValue={context.user.email}
          ref={register({ required: true })}
        />
        {errors.email && <span>This field is required</span>}
        <input type="submit" disabled={isSubmitting} />
        <button onClick={() => send({ type: 'PREV' })}>Prev</button>
      </form>
    </>
  );
};

const Password: React.FunctionComponent<{
  context: newUserContext;
  send: Sender<newUserEvent>;
}> = ({ context, send }) => {
  const { register, handleSubmit, errors, formState } = useForm<{
    password: string;
  }>();

  const { isSubmitting } = formState;

  const onSubmit: SubmitHandler<{ password: string }> = async (data) => {
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
          name="password"
          placeholder="secret"
          defaultValue={context.user.secret}
          ref={register({ required: true })}
        />
        {errors.password && <span>This field is required</span>}
        <input type="submit" disabled={isSubmitting} />
        <button onClick={() => send({ type: 'PREV' })}>Prev</button>
      </form>
    </>
  );
};

const Confirmation: React.FunctionComponent<{
  context: newUserContext;
}> = ({ context }) => {
  return (
    <>
      <h3>Success</h3>
      <div>{JSON.stringify(context)}</div>
    </>
  );
};

export const Toggler = () => {
  const [state, send] = useMachine(toggleMachine);

  const Wrapper = styled.div`
    width: 60%;
    height: 60%;
    padding: 0.2rem;
    background-color: #313336;
    border-radius: 0.4rem;
    box-shadow: 0 2.8px 2.2px -30px rgba(0, 0, 0, 0.02),
      0 6.7px 5.3px -30px rgba(0, 0, 0, 0.028),
      0 12.5px 10px -30px rgba(0, 0, 0, 0.035),
      0 22.3px 17.9px -30px rgba(0, 0, 0, 0.042),
      0 41.8px 33.4px -30px rgba(0, 0, 0, 0.05),
      0 100px 80px -30px rgba(0, 0, 0, 0.07);
  `;

  return (
    <Wrapper>
      {state.matches('name') ? (
        <Name context={state.context} send={send} />
      ) : state.matches('email') ? (
        <Email context={state.context} send={send} />
      ) : state.matches('password') ? (
        <Password context={state.context} send={send} />
      ) : state.matches('confirmation') ? (
        <Confirmation context={state.context} />
      ) : (
        <div>undefined</div>
      )}
    </Wrapper>
  );
};
