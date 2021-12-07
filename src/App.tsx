import React from 'react';
import { Route, Routes } from 'react-router';
import HomeScreen from './screens/home-screen';
import ProjectsScreen from './screens/projects-screen';
import NotFoundScreen from './screens/not-found-screen';
import ContactInformationScreen from './screens/contact-information-screen';
import ProjectDetailsScreen from './screens/project-details-screen';

/**
 * App component
 */
class App extends React.Component {

  /**
   * Component render
   */
  public render() {
    return (
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="projects" element={<ProjectsScreen />} />
        <Route path="project-details" element={<ProjectDetailsScreen />} />
        <Route path="contact-information" element={<ContactInformationScreen />} />
        <Route path="*" element={<NotFoundScreen />} />
      </Routes>
    );
  }
  
}

export default App;