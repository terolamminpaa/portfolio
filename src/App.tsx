import React from 'react';
import { Route, Routes } from 'react-router';
import { getAuth, User } from '@firebase/auth';
import HomeScreen from './screens/home-screen';
import AuthContext from './contexts/auth-context';
import SignInScreen from './screens/sign-in-screen';
import ProjectsScreen from './screens/projects-screen';
import NotFoundScreen from './screens/not-found-screen';
import ProjectFormScreen from './screens/project-form-screen';
import ProjectDetailsScreen from './screens/project-details-screen';
import ContactInformationScreen from './screens/contact-information-screen';

/**
 * Component props
 */
interface Props { }

/**
 * Component state
 */
interface State {
  user: User | null;
}

/**
 * App component
 */
class App extends React.Component<Props, State> {

  /**
   * Component constructor
   *
   * @param props props
   */
  constructor(props: Props) {
    super(props);
    this.state = {
      user: null
    };
  }

  /**
   * Component did mount
   */
  public componentDidMount = () => {
    const auth = getAuth();
    auth.onAuthStateChanged(this.onAuthStateChange);
  }

  /**
   * Component render
   */
  public render = () => {
    const { user } = this.state;

    return (
      <AuthContext.Provider value={{ user }}>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="sign-in" element={<SignInScreen />} />
          <Route path="projects" element={<ProjectsScreen />} />
          <Route path="add-project" element={<ProjectFormScreen />} />
          <Route path="edit-project" element={<ProjectFormScreen />} />
          <Route path="project-details" element={<ProjectDetailsScreen />} />
          <Route path="contact-information" element={<ContactInformationScreen />} />
          <Route path="*" element={<NotFoundScreen />} />
        </Routes>
      </AuthContext.Provider>
    );
  }

  /**
   * Method for changing auth state
   *
   * @param user user
   */
  private onAuthStateChange = (user: User | null) => {
    this.setState({ user });
  }
  
}

export default App;