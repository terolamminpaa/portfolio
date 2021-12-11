import { FormEvent, useEffect, useState, MouseEvent } from 'react';
import sx from './styles';
import Api from '../../api';
import theme from '../../theme';
import CodeIcon from '@mui/icons-material/Code';
import ClearIcon from '@mui/icons-material/Clear';
import { ImageObject, Project } from '../../types';
import BasicLayout from '../../layouts/basic-layout';
import PreviewIcon from '@mui/icons-material/Preview';
import { useLocation, useNavigate } from 'react-router';
import Dropzone, { DropzoneState } from 'react-dropzone';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Backdrop, Box, Button, CircularProgress, IconButton, Paper, Stack, TextField, ToggleButton, ToggleButtonGroup, Typography, useMediaQuery } from '@mui/material';

/**
 * Add project component
 */
export default function ProjectFormScreen() {
  const location = useLocation();
  const project: Project|undefined = location.state?.project;
  const navigateFunction = useNavigate();
  const [mode, setMode] = useState("code");
  const [loading, setLoading] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const [image, setImage] = useState<ImageObject|null>(null);
  const [projectText, setProjectText] = useState(project ? project.text : "");
  const [projectTitle, setProjectTitle] = useState(project ? project.title : "");
  const [projectGitHub, setProjectGitHub] = useState(project ? project.github : "");

  useEffect(() => {
    return () => {
      if (image) {
        URL.revokeObjectURL(image.url);
      }
    }
  }, [image]);

  const addProject = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!projectTitle || !image || !projectText || !projectGitHub) {
      setShowErrors(true);
      return;
    }

    setLoading(true);
    const newProject = await Api.addProject({
      projectTitle,
      projectText,
      projectGitHub,
      imageFile: image.file
    });
    setLoading(false);
    navigateFunction("/project-details", { state: { project: newProject } });
  }

  const editProject = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!project) {
      return;
    }

    if (!projectTitle || !projectText || !projectGitHub) {
      setShowErrors(true);
      return;
    }

    setLoading(true);
    const editedProject = await Api.editProject(project, {
      projectTitle,
      projectText,
      projectGitHub,
      imageFile: image ? image.file : undefined
    });
    setLoading(false);
    navigateFunction("/project-details", { state: { project: editedProject } });
  }

  const saveImage = (files: File[]) => {
    if (!files.length) {
      return;
    }

    const file = files[0];
    setImage({
      file: file,
      url: URL.createObjectURL(file)
    });
  }

  const clearImage = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setImage(null);
  }

  const toggleMode = (event: MouseEvent<HTMLElement, globalThis.MouseEvent>, value: string) => {

    if (!value) {
      return;
    }

    setMode(value);
  }

  const renderImageArea = () => {
    if (!!image) {
      return (
        <>
          <IconButton sx={sx.clearImageButton} onClick={clearImage}>
            <ClearIcon color="error" sx={sx.clearImageIcon} />
          </IconButton>
          <Box component="img" alt="project" src={image.url} sx={sx.dropzoneImage} />
        </>
      );
    } else if (!!project) {
      return (
        <Box component="img" alt="project" src={project.imageUrl} sx={sx.dropzoneImage} />
      );
    } else {
      return (
        <Stack direction="column" spacing={1} textAlign="center">
          <CloudUploadIcon sx={sx.dropzoneIcon} />
          <Typography variant="caption">Pudota kuva tähän tai valitse kuva klikkaamalla</Typography>
        </Stack>
      );
    }
  }

  const renderDropzone = (state: DropzoneState) => {
    const { getRootProps, getInputProps } = state;
    return (
      <>
        <Paper
          elevation={0}
          {...getRootProps()}
          sx={{
            ...sx.dropzone,
            border: showErrors && !image ? `1px solid ${theme.palette.error.main}` : "none"
          }}
        >
          <Box component="input" {...getInputProps()} />
          {renderImageArea()}
        </Paper>
        <Typography
          color="error"
          variant="caption"
          sx={{
            ...sx.helperText,
            display: showErrors && !image ? "block" : "none"
          }}
        >
          Lisää projektin kuva
        </Typography>
      </>
    );
  }

  return (
    <BasicLayout maxWidth={860}>
      <Backdrop open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Paper noValidate autoComplete="off" component="form" sx={sx.paper} onSubmit={project ? editProject : addProject}>
        <Stack direction="column" spacing={3}>
          <Stack direction="column" spacing={1}>
            <Typography>Projektin otsikko<Box component="span" sx={sx.required}>*</Box></Typography>
            <TextField
              fullWidth
              value={projectTitle}
              error={showErrors && !projectTitle}
              onChange={(event) => setProjectTitle(event.target.value)}
              helperText={showErrors && !projectTitle ? "Lisää projektin otsikko" : ""}
            />
          </Stack>
          <Stack direction="column" spacing={1}>
            <Typography>Projektin kuva<Box component="span" sx={sx.required}>*</Box></Typography>
            <Dropzone
              maxFiles={1}
              onDrop={saveImage}
              accept={[".png", ".jpg", ".jpeg"]}
            >
              {renderDropzone}
            </Dropzone>
          </Stack>
          <Stack direction="column" spacing={1}>
            <Typography>Projektin sisältö<Box component="span" sx={sx.required}>*</Box></Typography>
            <ToggleButtonGroup
              exclusive
              value={mode}
              color="standard"
              onChange={toggleMode}
            >
              <ToggleButton size="small" value="code">
                <CodeIcon />
              </ToggleButton>
              <ToggleButton size="small" value="preview">
                <PreviewIcon />
              </ToggleButton>
            </ToggleButtonGroup>
            <TextField
              fullWidth
              multiline
              rows={10}
              spellCheck={false}
              value={projectText}
              error={showErrors && !projectText}
              sx={{ display: mode === "code" ? "initial" : "none" }}
              onChange={(event) => setProjectText(event.target.value)}
              helperText={showErrors && !projectText ? "Lisää projektin sisältö" : ""}
            />
            <Paper
              elevation={0}
              sx={{
                ...sx.preview,
                display: mode === "preview" ? "initial" : "none",
                border: showErrors && !projectText ? `1px solid ${theme.palette.error.main}` : "none"
              }}
              dangerouslySetInnerHTML={{ __html: projectText }}
            >
            </Paper>
            <Typography
              color="error"
              variant="caption"
              sx={{
                ...sx.helperText,
                display: showErrors && !projectText && mode === "preview" ? "block" : "none"
              }}
            >
              Lisää projektin sisältö
            </Typography>
          </Stack>
          <Stack direction="column" spacing={1}>
            <Typography>Projektin GitHub linkki<Box component="span" sx={sx.required}>*</Box></Typography>
            <TextField
              fullWidth
              value={projectGitHub}
              error={showErrors && !projectGitHub}
              onChange={(event) => setProjectGitHub(event.target.value)}
              helperText={showErrors && !projectGitHub ? "Lisää projektin GitHub linkki" : ""}
            />
          </Stack>
          <Box textAlign="center">
            <Button
              size="large"
              type="submit"
              variant="outlined"
              fullWidth={useMediaQuery(theme.breakpoints.down("sm"))}
            >
              {project ? "Tallenna muutokset" : "Lisää projekti"}
            </Button>
            <Typography
              color="error"
              variant="caption"
              sx={{
                ...sx.helperText,
                display: showErrors && (!projectTitle || (!image && !project) || !projectText || !projectGitHub) ? "block" : "none"
              }}
            >
              Täytä kaikki pakolliset kentät
            </Typography>
          </Box>
        </Stack>
      </Paper>
    </BasicLayout>
  );

}