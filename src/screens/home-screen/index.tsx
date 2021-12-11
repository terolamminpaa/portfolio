import React, { CSSProperties } from 'react';
import sx from './styles';
import { storage } from '../..';
import { ref } from 'firebase/storage';
import { Link } from 'react-router-dom';
import { getDownloadURL } from '@firebase/storage';
import BasicLayout from '../../layouts/basic-layout';
import { Avatar, Button, Grid, Stack, Typography } from '@mui/material';

/**
 * Component props
 */
interface Props { }

/**
 * Component state
 */
interface State {
  imageUrl: string;
}

/**
 * Home screen component
 */
export default class HomeScreen extends React.Component<Props, State> {

  /**
   * Component constructor
   */
  constructor(props: Props) {
    super(props);
    this.state = {
      imageUrl: ""
    };
  }

  /**
   * Component did mount
   */
  public componentDidMount = async () => {
    const imageUrl = await getDownloadURL(ref(storage, "resources/images/me.jpeg"));
    this.setState({ imageUrl });
  }

  /**
   * Component render
   */
  public render = () => {
    const { imageUrl } = this.state;

    return (
      <BasicLayout>
        <Grid sx={sx.grid} container spacing={5}>
          <Grid item xs={12}>
            <Typography variant="h1" sx={sx.header}>Tervetuloa portfoliooni</Typography>
          </Grid>
          <Grid sx={sx.imageContainer} item xs={12}>
            <Stack direction="column">
              <Avatar
                src={imageUrl}
                sx={sx.avatar}
                alt="Tero Lamminpää"
              />
              <Typography sx={sx.avatarName}>Tero Lamminpää</Typography>
              <Typography sx={sx.avatarCaption}>Ohjelmoija</Typography>
            </Stack>
          </Grid>
          <Grid sx={sx.textContainer} item xs={12}>
            <Typography sx={sx.textContent}>
              Olen ammatiltani ohjelmoija, joka on erikoistunut web-teknologioihin.
              Tämän nettisivun tarkoituksena on esitellä osaamistani kertomalla erilaisista ohjelmointiprojekteistani.
              Mukana on myös yhteystietoni siltä varalta, että olet rekrytoija, joka harkitsee palkkaamistani.
            </Typography>
          </Grid>
          <Grid sx={sx.buttonContainer} item xs={12}>
            <Stack sx={sx.buttonStack} direction={{ xs: "column", sm: "row" }} spacing={{ xs: 2, sm: 5 }}>
              <Link style={sx.link as CSSProperties} to="/projects">
                <Button sx={sx.button} variant="outlined" size="large">Katso projektini</Button>
              </Link>
              <Link style={sx.link as CSSProperties} to="/contact-information">
                <Button sx={sx.button} variant="outlined" size="large">Ota yhteyttä</Button>
              </Link>
            </Stack>
          </Grid>
        </Grid>
      </BasicLayout>
    );
  }

}