import React from 'react';
import { Link } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work';
import CircleIcon from '@mui/icons-material/Circle';
import PersonIcon from '@mui/icons-material/Person';
import { AppBar, Box, Button, Container, Hidden, Stack, Toolbar, Typography } from '@mui/material';
import AuthContext from '../contexts/auth-context';

/**
 * Header component
 */
 export default class Header extends React.Component {

  /**
   * Component render
   */
  public render = () => {
    return (
      <Box>
        <AppBar position="static" color="secondary" elevation={0}>
          <Container disableGutters>
            <Toolbar>
                <Stack direction="row" spacing={2} style={{ flexGrow: 1 }}>
                  <AuthContext.Consumer>
                    {(context) => (
                      context.user ? <CircleIcon fontSize="small" color="success" sx={{ alignSelf: "center" }} /> : <></>
                    )}
                  </AuthContext.Consumer>
                  <Typography fontWeight="bold" component="h1" variant="h5">Tero Lamminpää</Typography>
                </Stack>
              <Hidden smDown>
                <Stack direction="row" spacing={2}>
                  <Link to="/">
                    <Button startIcon={ <Hidden mdDown><HomeIcon /></Hidden> } variant="text" color={ this.isSelected("/") }>Etusivu</Button>
                  </Link>
                  <Link to="/projects">
                    <Button startIcon={ <Hidden mdDown><WorkIcon /></Hidden> } variant="text" color={ this.isSelected("/projects") }>Projektit</Button>
                  </Link>
                  <Link to="/contact-information">
                    <Button startIcon={ <Hidden mdDown><PersonIcon /></Hidden> } variant="text" color={ this.isSelected("/contact-information") }>Yhteystiedot</Button>
                  </Link>
                </Stack>
              </Hidden>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
    );
  }

  /**
   * Method that checks if
   * element should have highlight
   *
   * @param path element path
   * @returns color name
   */
  private isSelected = (path: string): "primary" | "inherit" => {
    return window.location.pathname === path ? "primary" : "inherit";
  }

}