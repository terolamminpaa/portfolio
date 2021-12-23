import { useContext, useEffect, useState } from 'react';
import sx from './styles';
import Api from '../../api';
import { Project } from '../../types';
import { useNavigate } from 'react-router';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import GitHubIcon from '@mui/icons-material/GitHub';
import BasicLayout from '../../layouts/basic-layout';
import AuthContext from '../../contexts/auth-context';
import SelectAction from '../../components/select-action';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Button, ButtonBase, Card, CardActions, CardContent, CardHeader, CardMedia, Grid, Paper, Skeleton, Stack, Typography } from '@mui/material';
import ConfirmDialog from '../../components/confirm-dialog';

/**
 * Projects screen component
 */
export default function ProjectsScreen() {
  const navigateFunction = useNavigate();
  const context = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project|null>(null);
  
  useEffect(() => {
    setLoading(true);
    Api.getProjects().then(projects => {
      setProjects(projects);
      setLoading(false);
    });
  }, []);

  const shorten = (html: string): string => {
    return `${stripHtml(html).slice(0, 115)}... `;
  }

  const stripHtml = (html: string): string => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  }

  const navigateToProjectDetails = (project: Project) => () => {
    navigateFunction("/project-details", { state: { project: project } });
  }

  const navigateToNewProjectForm = () => {
    navigateFunction("/add-project");
  }

  const navigateToEditProjectForm = (project: Project) => () => {
    navigateFunction("/edit-project", { state: { project: project } });
  }

  const confirmProjectDeletion = (project: Project) => () => {
    setSelectedProject(project);
    setConfirmDialogOpen(true);
  }

  const deleteProject = () => {

    if (!selectedProject || !selectedProject.id) {
      return;
    }

    Api.deleteProject(selectedProject.id, selectedProject.imagePath).then(() => {
      setProjects(projects.filter(item => item.id !== selectedProject.id));
    });
    
    setConfirmDialogOpen(false)
  }

  const cancelProjectDelete = () => {
    setSelectedProject(null);
    setConfirmDialogOpen(false);
  }

  const cardAction = (project: Project) => (
    <AuthContext.Consumer>
      {(context) => (
        context.user ?
          <SelectAction
            actionItems={[
              {
                text: "Muokkaa",
                icon: <EditIcon />,
                action: navigateToEditProjectForm(project)
              },
              {
                text: "Poista",
                icon: <DeleteIcon />,
                action: confirmProjectDeletion(project)
              }
            ]}
          />
        :
          <></>
      )}
    </AuthContext.Consumer>
  );

  const renderProjectCards = () => {

    if (loading) {
      return Array.from(new Array(context.user ? 2 : 3)).map((item, index) => (
        <Grid key={index} item md={4} sm={6} xs={12}>
          <Card>
            <CardHeader title={<Skeleton variant="text" />} />
            <CardMedia>
              <Skeleton variant="rectangular" height={210} />
            </CardMedia>
            <CardContent>
              <Skeleton variant="text" />
              <Skeleton variant="text" />
            </CardContent>
          </Card>
        </Grid>
      ));
    }

    return projects.map((project, index) => (
      <Grid key={index} item md={4} sm={6} xs={12}>
        <Card sx={sx.projectCard}>
          <CardHeader title={project.title} action={cardAction(project)} />
          <CardMedia component="img" image={project.imageUrl} height={210} />
          <CardContent sx={sx.projectCardContent}>
            <Typography component="span" sx={sx.projectCardText}>
              {shorten(project.text)}
            </Typography>
            <ButtonBase onClick={navigateToProjectDetails(project)}>
              <Typography color="lightblue" component="span">
                Lue lisää
              </Typography>
            </ButtonBase>
          </CardContent>
          <CardActions sx={sx.projectCardActions}>
            <Button href={project.github} color="inherit" variant="outlined" sx={sx.githubButton}>
              <Stack direction="row" spacing={1}>
                <GitHubIcon />
                <Typography>GitHub</Typography>
              </Stack>
            </Button>
          </CardActions>
        </Card>
      </Grid>
    ));
  }

  return (
    <BasicLayout>
      <Grid container spacing={2}>
        <AuthContext.Consumer>
          {(context) => (
            context.user ?
              <Grid sx={sx.newProjectGrid} item md={4} sm={6} xs={12}>
                <Paper sx={sx.newProjectContainer}>
                  <Button color="inherit" sx={sx.newProjectButton} onClick={navigateToNewProjectForm}>
                    <Stack direction="column" spacing={2}>
                      <AddCircleOutlineIcon sx={sx.newProjectIcon} />
                      <Typography alignSelf="center">Lisää projekti</Typography>
                    </Stack>
                  </Button>
                </Paper>
              </Grid>
            :
              <></>
          )}
        </AuthContext.Consumer>
        {renderProjectCards()}
      </Grid>
      <ConfirmDialog
        open={confirmDialogOpen}
        acceptText="Poista"
        cancelText="Peruuta"
        title="Oletko varma, että haluat poistaa projektin?"
        accept={deleteProject}
        cancel={cancelProjectDelete}
      />
    </BasicLayout>
  );

}
