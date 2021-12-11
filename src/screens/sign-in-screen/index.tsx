import React, { ChangeEvent, FormEvent } from 'react';
import sx from './styles';
import Api from '../../api';
import BasicLayout from '../../layouts/basic-layout';
import AuthContext from '../../contexts/auth-context';
import { Box, Button, Paper, Stack, TextField, Typography } from '@mui/material';

/**
 * Component props
 */
interface Props { }

/**
 * Component state
 */
interface State {
  email: string;
  password: string;
}

/**
 * Sign in screen component
 */
class SignInScreen extends React.Component<Props, State> {

  /**
   * Component constructor
   */
  constructor(props: Props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  /**
   * Component render
   */
  public render = () => {
    const { user } = this.context;

    if (user) {
      return (
        <BasicLayout>
          <Paper sx={sx.signOutContainer} noValidate component="form" onSubmit={this.submitSignOut}>
            <Stack direction="column" spacing={2} textAlign="center">
              <Button fullWidth variant="outlined" size="large" type="submit">Kirjaudu ulos</Button>
            </Stack>
          </Paper>
        </BasicLayout>
      );
    }

    return (
      <BasicLayout>
        <Box noValidate component="form" onSubmit={this.submitSignIn}>
          <Paper sx={sx.signInContainer}>
            <Stack direction="column" spacing={2} textAlign="center">
              <Typography sx={sx.signInHeader}>Kirjaudu sisään</Typography>
              <TextField label="Sähköposti" name="email" onChange={this.changeCredentials} />
              <TextField label="Salasana" type="password" name="password" onChange={this.changeCredentials} />
              <Button fullWidth variant="outlined" size="large" type="submit">Kirjaudu sisään</Button>
            </Stack>
          </Paper>
        </Box>
      </BasicLayout>
    );
  }

  /**
   * Method for on changing credentials
   *
   * @param event change event
   */
  private changeCredentials = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const key = event.target.name;
    const value = event.target.value;
    this.setState({ [key]: value } as any);
  }

  /**
   * Method for submitting sign in
   *
   * @param event form event
   */
  private submitSignIn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { email, password } = this.state;
    await Api.signIn(email, password);
  }

  /**
   * Method for submitting sign out
   *
   * @param event form event
   */
   private submitSignOut = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await Api.signOut();
  }

}

SignInScreen.contextType = AuthContext;
export default SignInScreen;