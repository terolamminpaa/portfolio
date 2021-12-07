import React from 'react';
import { Link } from 'react-router-dom';
import image from '../../resources/images/me.jpeg';
import BasicLayout from '../../layouts/basic-layout';
import { Avatar, Button, Grid, Stack, Typography } from '@mui/material';
import './styles.css';

interface Props { }

interface State { }

/**
 * Home screen component
 */
export default class HomeScreen extends React.Component<Props, State> {

  /**
   * Component constructor
   */
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  /**
   * Component render
   */
  public render() {
    return (
      <BasicLayout>
        <Grid className="grid" container spacing={5}>
          <Grid item xs={12}>
            <Typography variant="h1" sx={{ mt: 2 }}>Tervetuloa portfoliooni</Typography>
          </Grid>
          <Grid className="image-container" item xs={12}>
            <Stack direction="column">
              <Avatar
                src={image}
                alt="Tero Lamminpää"
                sx={{ width: 250, height: 250, border: "1rem solid #1f1f1f" }}
              />
              <Typography sx={{ alignSelf: "center", mt: 1 }}>Tero Lamminpää</Typography>
              <Typography sx={{ alignSelf: "center" }}>Ohjelmoija</Typography>
            </Stack>
          </Grid>
          <Grid className="text-container" item xs={12}>
            <Typography textAlign="initial" sx={{ maxWidth: 500, hyphens: "auto" }}>
              Olen ammatiltani ohjelmoija, joka on erikoistunut web-teknologioihin.
              Tämän nettisivun tarkoituksena on esitellä osaamistani kertomalla erilaisista ohjelmointiprojekteistani.
              Mukana on myös yhteystietoni siltä varalta, että olet rekrytoija, joka harkitsee palkkaamistani.
            </Typography>
          </Grid>
          <Grid className="button-container" item xs={12}>
            <Stack className="button-stack" direction={{ xs: "column", sm: "row" }} spacing={{ xs: 2, sm: 5 }}>
              <Link className="link" to="/projects">
                <Button style={{ width: "100%" }} variant="outlined" size="large">Katso projektini</Button>
              </Link>
              <Link className="link" to="/contact-information">
                <Button style={{ width: "100%" }} variant="outlined" size="large">Ota yhteyttä</Button>
              </Link>
            </Stack>
          </Grid>
        </Grid>
      </BasicLayout>
    );
  }

}