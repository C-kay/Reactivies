import { FORM_ERROR } from 'final-form';
import React, { useContext } from 'react';
import {Form as FinalForm, Field} from 'react-final-form';
import { combineValidators, isRequired } from 'revalidate';
import { Button, Form, Header } from 'semantic-ui-react';
import { IUserFormValues } from '../../app/models/user';
import { RootStoreContext } from '../../app/stores/rootStore';
import ErrorMessage from '../activities/dashboard/form/ErrorMessage';
import { TextInput } from '../activities/dashboard/form/TextInput';

const validate = combineValidators({
    email: isRequired('email'),
    password: isRequired('password')
})

export const LoginForm = () => {

    const rootStore = useContext(RootStoreContext);
  const{login} = rootStore.userStore;
    return (
      <FinalForm
        validate={validate}
        onSubmit={(values: IUserFormValues) =>
          login(values).catch((error) => ({
            [FORM_ERROR]: error,
          }))
        }
        render={({
          handleSubmit,
          submitting,
          submitError,
          invalid,
          pristine,
          dirtyFieldsSinceLastSubmit,
        }) => (
          <Form onSubmit={handleSubmit} error>
            <Header
              as="h2"
              content="Login to Reactivities"
              color="teal"
              textAlign="center"
            />
            <Field name="email" component={TextInput} placeholder="Email" />
            <Field
              name="password"
              component={TextInput}
              placeholder="Password"
              type="password"
            />
            {submitError && !dirtyFieldsSinceLastSubmit && (
              // <Label color="red" basic content={submitError.statusText} />
              <ErrorMessage 
                error={submitError}
                text="Invalid emial or password"
              />
            )}
            <br />
            <Button
              loading={submitting}
              disabled={invalid || pristine || !dirtyFieldsSinceLastSubmit}
              color="teal"
              content="Login"
              fluid
            />
            {/* <pre>{JSON.stringify(form.getState(), null, 2)}</pre> */}
          </Form>
        )}
      />
    );
}
