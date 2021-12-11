import React from 'react';
import sx from './styles';
import Header from '../components/header';
import Footer from '../components/footer';
import { Box, Container } from '@mui/material';

/**
 * Component props
 */
interface Props {
  maxWidth?: number;
}

/**
 * Basic layout component
 */
class BasicLayout extends React.Component<Props> {

  /**
   * Component render
   */
  public render = () => {
    const { maxWidth } = this.props;

    return (
      <Box sx={sx.background}>
        <Header />
        <Box sx={sx.content}>
          <Container sx={sx.container} style={{ maxWidth: maxWidth || 1200 }}>
            { this.props.children }
          </Container>
        </Box>
        <Footer />
      </Box>
    );
  }

}

export default BasicLayout;