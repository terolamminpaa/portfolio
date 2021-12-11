import sx from './styles';
import GitHubIcon from '@mui/icons-material/GitHub';
import BasicLayout from '../../layouts/basic-layout';
import { Navigate, useLocation } from 'react-router';
import { Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Stack, Typography } from '@mui/material';

/**
 * Project details screen component
 */
export default function ProjectDetailsScreen() {

  const location = useLocation();

  if (!location.state) {
    return <Navigate to="/projects" />;
  }

  const { project } = location.state;

  return (
    <BasicLayout maxWidth={860}>
      <Card>
        <CardHeader title={project.title} />
        <CardMedia component="img" image={project.imageUrl} />
        <CardContent>
          <Box sx={sx.content} dangerouslySetInnerHTML={{ __html: project.text }} />
        </CardContent>
        <CardActions sx={sx.cardActions}>
          <Button href={project.github} color="inherit" variant="outlined" sx={sx.button}>
            <Stack direction="row" spacing={1}>
              <GitHubIcon />
              <Typography>GitHub</Typography>
            </Stack>
          </Button>
        </CardActions>
      </Card>
    </BasicLayout>
  );

}