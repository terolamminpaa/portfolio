import React from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import { Box, Container } from '@mui/material';
import './styles.css';

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
      <Box className="background">
        <Header />
        <Box className="content">
          <Container className="container" style={{ maxWidth: maxWidth || 1200 }} sx={{ pt: 2 }}>
            { this.props.children }
          </Container>
        </Box>
        <Footer />
      </Box>
    );
  }

}

export default BasicLayout;