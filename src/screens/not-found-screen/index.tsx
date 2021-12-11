import React from 'react';
import { Box, Typography } from '@mui/material';
import BasicLayout from '../../layouts/basic-layout';


/**
 * Not found screen component
 */
export default class NotFoundScreen extends React.Component {

  /**
   * Component render
   */
   public render = () => {
    return (
      <BasicLayout>
        <Box textAlign="center">
          <Typography>Sivua ei löydy!</Typography>
        </Box>
      </BasicLayout>
    );
  }

}