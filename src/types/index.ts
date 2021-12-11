import { SxProps, Theme } from "@mui/system";

export interface Project {
  id?: string;
  title: string;
  imagePath: string;
  imageUrl: string;
  text: string;
  github: string;
}

export interface ProjectBody {
  projectTitle: string;
  projectText: string;
  projectGitHub: string;
  imageFile: File;
}

/**
 * Interface for image object
 */
export interface ImageObject {
  file: File;
  url: string;
}

export interface SXStyles {
  [key: string]: SxProps<Theme>
}