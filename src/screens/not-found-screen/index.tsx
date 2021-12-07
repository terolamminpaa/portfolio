import { Typography } from '@mui/material';
import React from 'react';

import BasicLayout from '../../layouts/basic-layout';

interface Props { }

interface State { }

/**
 * Not found screen component
 */
export default class NotFoundScreen extends React.Component<Props, State> {

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
        <Typography>Page not found</Typography>
      </BasicLayout>
    );
  }

}