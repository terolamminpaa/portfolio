import GitHubIcon from '@mui/icons-material/GitHub';
import BasicLayout from '../../layouts/basic-layout';
import { Navigate, useLocation } from 'react-router';
import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, Stack, Typography } from '@mui/material';

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
        <CardMedia component="img" image={project.image} />
        <CardContent>
          <div style={{ hyphens: "auto" }} dangerouslySetInnerHTML={{ __html: project.text }} />
        </CardContent>
        <CardActions sx={{ pt: 0, pb: 2, justifyContent: "center" }}>
          <Button href={project.github} color="inherit" variant="outlined" sx={{ textTransform: "none" }}>
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