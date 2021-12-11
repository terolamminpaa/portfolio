import React from 'react';
import { storage } from '../..';
import GitHubIcon from '@mui/icons-material/GitHub';
import BasicLayout from '../../layouts/basic-layout';
import { getDownloadURL, ref } from 'firebase/storage';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import DownloadIcon from '@mui/icons-material/Download';
import { Box, Link, Paper, Stack, Typography } from '@mui/material';

interface Props { }

interface State {
  cvUrl: string;
}

/**
 * Contact information screen component
 */
export default class ContactInformationScreen extends React.Component<Props, State> {

  /**
   * Component constructor
   */
  constructor(props: Props) {
    super(props);
    this.state = {
      cvUrl: ""
    };
  }

  /**
   * Component did mount
   */
   public componentDidMount = async () => {
    const cvUrl = await getDownloadURL(ref(storage, "resources/files/cv.pdf"));
    this.setState({ cvUrl });
  }

  /**
   * Component render
   */
   public render = () => {
    const { cvUrl } = this.state;

    return (
      <BasicLayout>
        <Paper sx={{ p: 2 }}>
          <Box>
            <Stack direction="column" spacing={2}>
              <Stack direction="row" spacing={2}>
                <Box>
                  <DownloadIcon />
                </Box>
                <Link href={cvUrl} target="_blank" download="cv_tero_lamminpaa.pdf">
                  <Typography color="lightblue">Lataa CV</Typography>
                </Link>
              </Stack>
              <Stack direction="row" spacing={2}>
                <Box>
                  <GitHubIcon />
                </Box>
                <Link href="https://github.com/terolamminpaa" target="_blank">
                  <Typography color="lightblue">GitHub tili</Typography>
                </Link>
              </Stack>
              <Stack direction="row" spacing={2}>
                <Box>
                  <LinkedInIcon />
                </Box>
                <Link href="https://www.linkedin.com/in/tero-lamminp%C3%A4%C3%A4-0a0778177/" target="_blank">
                  <Typography color="lightblue">LinkedIn profiili</Typography>
                </Link>
              </Stack>
            </Stack>
          </Box>
        </Paper>
      </BasicLayout>
    );
  }

}