import { SyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work';
import PersonIcon from '@mui/icons-material/Person';
import { BottomNavigation, BottomNavigationAction, Hidden, Paper } from '@mui/material';

/**
 * Footer component
 */
export default function Footer() {

  const navigateFunction = useNavigate();
  
  const navigate = (event: SyntheticEvent<Element, Event>, value: string) => {
    navigateFunction(value);
  }
  
  return (
    <Hidden smUp>
      <Paper elevation={3}>
        <BottomNavigation value={window.location.pathname || "/"} onChange={navigate}>
          <BottomNavigationAction label="Etusivu" value="/" icon={<HomeIcon />} />
          <BottomNavigationAction label="Projektit" value="/projects" icon={<WorkIcon />} />
          <BottomNavigationAction label="Yhteystiedot" value="/contact-information" icon={<PersonIcon />} />
        </BottomNavigation>
      </Paper>
    </Hidden>
  );

}